//
//  SleepTracker.swift
//  JarvisHealth
//
//  Created by Zayd Krunz on 5/3/26.
//

import Combine
import HealthKit
import Foundation

class SleepTracker: ObservableObject {
    static let shared = SleepTracker()
    
    private let healthStore = HKHealthStore()
    private let serverURL = URL(string: "https://zaydkrunz.com/api/sleep")!
    
    @Published var currentStatus: String = "Unknown"
    @Published var lastUpdate: Date?
    @Published var errorMessage: String?
    @Published var hasSecret: Bool = false
    
    private var observerQuery: HKObserverQuery?
    private let keychainService = "JarvisHealth"
    private let keychainAccount = "sleepServerSecret"
    private let lastSyncKey = "sleepLastSyncedEndDate"
    
    private init() {}
    
    private var lastSyncedEndDate: Date? {
        get {
            UserDefaults.standard.object(forKey: lastSyncKey) as? Date
        }
        set {
            UserDefaults.standard.set(newValue, forKey: lastSyncKey)
        }
    }
    
    func requestAuthorization() {
        guard HKHealthStore.isHealthDataAvailable() else {
            errorMessage = "HealthKit unavailable on this device"
            return
        }
        
        guard let sleepType = HKObjectType.categoryType(forIdentifier: .sleepAnalysis) else {
            errorMessage = "Sleep analysis type unavailable"
            return
        }
        
        healthStore.requestAuthorization(toShare: [], read: [sleepType]) { [weak self] success, error in
            DispatchQueue.main.async {
                if let error = error {
                    self?.errorMessage = "Auth error: \(error.localizedDescription)"
                    return
                }
                if success {
                    self?.enableBackgroundDelivery()
                } else {
                    self?.errorMessage = "HealthKit authorization denied"
                }
            }
        }
    }
    
    private func enableBackgroundDelivery() {
        guard let sleepType = HKObjectType.categoryType(forIdentifier: .sleepAnalysis) else { return }
        
        healthStore.enableBackgroundDelivery(for: sleepType, frequency: .immediate) { [weak self] success, error in
            DispatchQueue.main.async {
                if let error = error {
                    self?.errorMessage = "Background delivery error: \(error.localizedDescription)"
                    return
                }
                if success {
                    self?.setupObserverQuery()
                    self?.fetchLatestSleepSample()
                }
            }
        }
    }
    
    private func setupObserverQuery() {
        guard let sleepType = HKObjectType.categoryType(forIdentifier: .sleepAnalysis) else { return }
        
        observerQuery = HKObserverQuery(sampleType: sleepType, predicate: nil) { [weak self] _, completionHandler, error in
            if let error = error {
                DispatchQueue.main.async {
                    self?.errorMessage = "Observer error: \(error.localizedDescription)"
                }
                completionHandler()
                return
            }
            
            self?.fetchLatestSleepSample()
            completionHandler()
        }
        
        if let query = observerQuery {
            healthStore.execute(query)
        }
    }
    
    func fetchLatestSleepSample(force: Bool = false) {
        fetchRecentSleepIntervals(hoursBack: 48, force: force)
    }

    private func fetchRecentSleepIntervals(hoursBack: Int, force: Bool = false) {
        guard let sleepType = HKObjectType.categoryType(forIdentifier: .sleepAnalysis) else { return }

        let now = Date()
        let startDate = Calendar.current.date(byAdding: .hour, value: -hoursBack, to: now)
        guard let startDate = startDate else { return }

        let predicate = HKQuery.predicateForSamples(withStart: startDate, end: now, options: .strictEndDate)
        let sortDescriptor = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: true)

        let query = HKSampleQuery(sampleType: sleepType, predicate: predicate, limit: HKObjectQueryNoLimit, sortDescriptors: [sortDescriptor]) { [weak self] _, samples, error in
            guard let self = self else { return }

            if let error = error {
                DispatchQueue.main.async {
                    self.errorMessage = "Query error: \(error.localizedDescription)"
                }
                return
            }

            guard let samples = samples as? [HKCategorySample], !samples.isEmpty else {
                DispatchQueue.main.async {
                    self.currentStatus = "No sleep data"
                }
                return
            }

            let intervals = self.buildAsleepIntervals(from: samples)
            let latestInterval = intervals.last

            DispatchQueue.main.async {
                if let latestInterval = latestInterval {
                    self.currentStatus = "Asleep interval: \(self.formatTime(latestInterval.start)) - \(self.formatTime(latestInterval.end))"
                } else {
                    self.currentStatus = "No asleep intervals"
                }
                self.lastUpdate = Date()
            }

            let group = DispatchGroup()
            var newestEnd: Date?

            for interval in intervals {
                if !force, let lastSynced = self.lastSyncedEndDate, interval.end <= lastSynced {
                    continue
                }
                group.enter()
                self.sendServerInterval(startDate: interval.start, endDate: interval.end) { success in
                    if success {
                        newestEnd = max(newestEnd ?? interval.end, interval.end)
                    }
                    group.leave()
                }
            }

            group.notify(queue: .main) {
                if let newestEnd = newestEnd {
                    self.lastSyncedEndDate = newestEnd
                }
            }
        }

        healthStore.execute(query)
    }
    
    private func statusString(for value: Int) -> String {
        switch value {
        case HKCategoryValueSleepAnalysis.asleepUnspecified.rawValue,
             HKCategoryValueSleepAnalysis.asleepCore.rawValue,
             HKCategoryValueSleepAnalysis.asleepDeep.rawValue,
             HKCategoryValueSleepAnalysis.asleepREM.rawValue:
            return "Asleep"
        case HKCategoryValueSleepAnalysis.awake.rawValue:
            return "Awake"
        default:
            return "Unknown"
        }
    }

    private func buildAsleepIntervals(from samples: [HKCategorySample]) -> [(start: Date, end: Date)] {
        let asleepSamples = samples.filter { self.statusString(for: $0.value) == "Asleep" }
        guard !asleepSamples.isEmpty else { return [] }

        var intervals: [(start: Date, end: Date)] = []
        var currentStart = asleepSamples[0].startDate
        var currentEnd = asleepSamples[0].endDate

        for sample in asleepSamples.dropFirst() {
            if sample.startDate <= currentEnd.addingTimeInterval(60) {
                currentEnd = max(currentEnd, sample.endDate)
            } else {
                intervals.append((start: currentStart, end: currentEnd))
                currentStart = sample.startDate
                currentEnd = sample.endDate
            }
        }

        intervals.append((start: currentStart, end: currentEnd))
        return intervals
    }

    private func formatTime(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        formatter.dateStyle = .none
        return formatter.string(from: date)
    }

    private func forceUTCZString(from date: Date) -> String {
        let calendar = Calendar.current
        let components = calendar.dateComponents([.year, .month, .day, .hour, .minute, .second], from: date)
        let year = components.year ?? 0
        let month = String(format: "%02d", components.month ?? 0)
        let day = String(format: "%02d", components.day ?? 0)
        let hour = String(format: "%02d", components.hour ?? 0)
        let minute = String(format: "%02d", components.minute ?? 0)
        let second = String(format: "%02d", components.second ?? 0)
        return "\(year)-\(month)-\(day)T\(hour):\(minute):\(second).000Z"
    }
    
    private func sendServerInterval(startDate: Date, endDate: Date, completion: @escaping (Bool) -> Void) {
        guard let secret = getSecret(), !secret.isEmpty else {
            DispatchQueue.main.async {
                self.errorMessage = "No secret saved. Add your server secret below."
                completion(false)
            }
            return
        }

        let startedAt = forceUTCZString(from: startDate)
        let endedAt = forceUTCZString(from: endDate)

        var request = URLRequest(url: serverURL)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let payload: [String: String] = [
            "startedAt": startedAt,
            "endedAt": endedAt,
            "secret": secret
        ]

        guard let body = try? JSONSerialization.data(withJSONObject: payload) else {
            completion(false)
            return
        }

        request.httpBody = body

        let task = URLSession.shared.dataTask(with: request) { [weak self] data, response, error in
            DispatchQueue.main.async {
                if let error = error {
                    self?.errorMessage = "Server update error: \(error.localizedDescription)"
                    completion(false)
                    return
                }

                guard let httpResponse = response as? HTTPURLResponse else {
                    self?.errorMessage = "Server update failed: invalid response"
                    completion(false)
                    return
                }

                if httpResponse.statusCode == 401 {
                    self?.errorMessage = "Server rejected update: invalid secret"
                    completion(false)
                } else if !(200...299).contains(httpResponse.statusCode) {
                    self?.errorMessage = "Server update failed: HTTP \(httpResponse.statusCode)"
                    completion(false)
                } else {
                    self?.errorMessage = nil
                    completion(true)
                }
            }
        }

        task.resume()
    }

    func updateSecret(_ secret: String) {
        let trimmed = secret.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.isEmpty {
            deleteSecret()
        } else {
            saveSecret(trimmed)
        }
        DispatchQueue.main.async {
            self.hasSecret = !trimmed.isEmpty
        }
    }
    
    func loadSecretState() {
        DispatchQueue.main.async {
            self.hasSecret = (self.getSecret() != nil)
        }
    }
    
    func getSecret() -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: keychainService,
            kSecAttrAccount as String: keychainAccount,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        guard status == errSecSuccess, let data = result as? Data else {
            return nil
        }
        return String(data: data, encoding: .utf8)
    }
    
    private func saveSecret(_ secret: String) {
        let data = Data(secret.utf8)
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: keychainService,
            kSecAttrAccount as String: keychainAccount
        ]
        
        let attributes: [String: Any] = [
            kSecValueData as String: data
        ]
        
        if SecItemCopyMatching(query as CFDictionary, nil) == errSecSuccess {
            SecItemUpdate(query as CFDictionary, attributes as CFDictionary)
        } else {
            var addQuery = query
            addQuery[kSecValueData as String] = data
            SecItemAdd(addQuery as CFDictionary, nil)
        }
    }
    
    private func deleteSecret() {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: keychainService,
            kSecAttrAccount as String: keychainAccount
        ]
        SecItemDelete(query as CFDictionary)
    }
}
