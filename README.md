# BizPal Mobile App

**BizPal** is a professional mobile shell built with **React Native** and **Expo**. It provides a high-performance WebView experience, integrating the BizPal web ecosystem into a native Android application with advanced navigation and loading features.

---

## 🚀 Key Features

* **Smart Navigation Memory:** Integrated hardware back-button handling that navigates through WebView history instead of closing the app.
* **Branded Exit Confirmation:** A custom themed modal that prevents accidental app closures.
* **Dual Loading Feedback:** Real-time horizontal progress bar combined with standard activity indicators.
* **Pull-to-Refresh:** Native gesture support to reload web content.
* **Resilient Error Handling:** Custom "Connection Error" and "Invalid URL" screens with a built-in **Retry** mechanism.
* **Professional Branding:** Consistent use of corporate colors and typography across all native components.

---

## 🛠 Tech Stack

* **Framework:** React Native / Expo
* **Core Component:** `react-native-webview`
* **UI/UX:** `react-native-safe-area-context` & `expo-status-bar`
* **Build Tool:** EAS (Expo Application Services)

---

## 📦 Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
* **Node.js** (LTS version recommended)
* **EAS CLI**: `npm install -g eas-cli`

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone [repository-url]
cd bizpal-mobile
npm install

3. Development
To start the development server:

Bash
npx expo start
🏗 Build & Deployment
This project uses EAS (Expo Application Services) for cloud builds.

Generate a Preview Build (Android)
Used for testing the app on physical devices before production:

Bash
eas build --platform android --profile preview
Generate a Development Build
Used for active debugging with native modules:

Bash
eas build --platform android --profile development
📂 Project Structure (Technical Notes)
index.jsx: The main entry point containing the WebView logic, BackHandler listeners, and state management for loading/errors.

/components/CustomModal.jsx: A reusable, themed modal component used for exit confirmations.

/theme/index.js: Centralized configuration for Colors and Typography to ensure brand consistency.

👥 Contributors
TechCrush Capstone Group 15 Members

Group 15 Development Team