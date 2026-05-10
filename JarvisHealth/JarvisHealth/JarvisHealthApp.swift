//
//  JarvisHealthApp.swift
//  JarvisHealth
//
//  Created by Zayd Krunz on 5/3/26.
//

import SwiftUI

@main
struct JarvisHealthApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        SleepTracker.shared.requestAuthorization()
        return true
    }
    
    func applicationDidEnterBackground(_ application: UIApplication) {
        // Background delivery keeps the observer alive
    }
    
    func applicationWillEnterForeground(_ application: UIApplication) {
        SleepTracker.shared.fetchLatestSleepSample()
    }
}
