# CCBC Attendance App

The **CCBC Attendance App** is a mobile application built with **React Native** and **Firebase** for managing and tracking attendance within the CCBC community. The app allows users to log attendance, view reports, manage their profile, and access help and support.

---

## **Features**

- **User Authentication**
  - Sign in securely with email/password (Firebase Auth)
  
- **Attendance Management**
  - View attendance records with date, time, service, and status
  - Animated attendance cards for better user experience
  - Empty state handling when no records exist

- **User Profile**
  - Edit personal information (Full Name, Marital Status, Gender, Date of Birth, Home Address, Occupation, Department, Notes)
  - Upload profile picture using device gallery or camera
  - Changes saved in Firebase Firestore and profile pictures in Firebase Storage

- **Help & Support**
  - FAQ section with common questions
  - Contact support via email or phone
  - Gradient background and consistent footer

- **UI Design**
  - Smooth and responsive design
  - Gradient backgrounds on screens
  - Consistent footer branding across screens

---

## **Tech Stack**

- **Frontend:** React Native, Expo
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **UI & Icons:** Expo LinearGradient, Ionicons, MaterialIcons
- **Image Upload:** Expo Image Picker

---

## **Firebase Setup**

1. **Create Firebase Project**  
2. **Enable Authentication (Email/Password)**  
3. **Create Firestore Collections**
   - `attendance` → fields: `uid`, `date`, `time`, `service`, `status`
   - `users` → fields: `uid`, `fullname`, `gender`, `dob`, `address`, `occupation`, `department`, `notes`, `profilePicUrl`
4. **Enable Firebase Storage** for profile images
5. **Firestore Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
