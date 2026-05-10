//
//  ContentView.swift
//  JarvisHealth
//
//  Created by Zayd Krunz on 5/3/26.
//

import SwiftUI

struct ContentView: View {
    @Environment(\.scenePhase) var scenePhase
    @StateObject private var tracker = SleepTracker.shared
    @State private var secretInput: String = ""
    
    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "bed.double.fill")
                .imageScale(.large)
                .foregroundStyle(.indigo)
            
            Text("Latest Interval")
                .font(.headline)
            
            Text(tracker.currentStatus)
                .font(.title3)
                .bold()
            
            if let lastUpdate = tracker.lastUpdate {
                Text("Last updated: \(lastUpdate.formatted())")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
            
            if let error = tracker.errorMessage {
                Text(error)
                    .font(.caption)
                    .foregroundStyle(.red)
                    .multilineTextAlignment(.center)
            }
            
            VStack(spacing: 8) {
                Text("Server Secret")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                SecureField("Enter secret", text: $secretInput)
                    .textFieldStyle(.roundedBorder)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                Button(tracker.hasSecret ? "Update Secret" : "Save Secret") {
                    tracker.updateSecret(secretInput)
                }
                Text("Required for server updates")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
            .padding(.top)
            
            VStack(spacing: 4) {
                Button("Refresh Now") {
                    tracker.fetchLatestSleepSample()
                }
                Text("Fetches latest sleep and sends only new intervals")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }
            .padding(.top)
            
            VStack(spacing: 4) {
                Button("Force Sync") {
                    tracker.fetchLatestSleepSample(force: true)
                }
                .buttonStyle(.borderedProminent)
                .tint(.orange)
                Text("Resends all intervals from the last 48 hours")
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }
            .padding(.top)
            

        }
        .padding()
        .onAppear {
            tracker.loadSecretState()
        }
        .onChange(of: scenePhase) { newPhase in
            if newPhase == .active {
                tracker.fetchLatestSleepSample()
            }
        }
    }
}

#Preview {
    ContentView()
}
