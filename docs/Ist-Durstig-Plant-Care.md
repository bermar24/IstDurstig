# Ist Durstig - Plant Care Tracker App Development Requirements

This document unifies the requirements for the Ist Durstig Plant Care Tracker App, prioritizing key aspects and consolidating information from the provided specification documents.

## 1. Key Aspects for Development

### Application Analysis
* **Application Type**: Multi-platform application consisting of:
    * Backend REST API (Java Spring Boot)
    * Web Frontend (React with TypeScript)
    * Android App (Native Java)
* **Technology Stack**:
    * **Backend**: Java Spring Boot, MongoDB, Spring Security (JWT), Gradle
    * **Frontend**: React with TypeScript, Tailwind CSS, Axios
    * **Android**: Native Java, Retrofit2, Firebase, MVVM architecture
    * **Database**: MongoDB
* **Key Functionality**:
    * Plant management with care tracking (watering, fertilizing, transplanting)
    * Custom watering schedules with frequency settings
    * Shared plant lists between users
    * Guest mode for Android (offline JSON storage)
    * Push notifications for Android

## 2. App Summary & Use Cases

[cite_start]Ist Durstig helps users care for their plants by providing a minimalist plant-care tracking system for individuals or groups (like roommates or families)[cite: 1, 2].

### Available Platforms
* [cite_start]Web App: React frontend + Java backend (Spring Boot) [cite: 32]
* [cite_start]Android App: Native Java app with local JSON storage for guests [cite: 32]

### Core Functionality & Features
* [cite_start]**Add/Edit Plants**: Users can add and edit plants, including Name, Type, Tags, Notes, and Photo[cite: 3].
* [cite_start]**Set Watering Frequency**: Define custom watering schedules (e.g., Every 2/5/10 days), indicated by "Frequent," "Medium," or "Rare" options[cite: 3].
* [cite_start]**Track Events**: Log events such as watering, transplanting, and fertilization[cite: 3].
* [cite_start]**Daily Checklist**: A checklist of plants due today will be available on the homepage[cite: 3].
* [cite_start]**Care History**: Maintain a history of care events for each plant[cite: 17].
* [cite_start]**Shared Lists**: Users can share plant lists, which are editable by collaborators[cite: 3, 33].
* [cite_start]**Photo Upload**: Support for uploading plant photos[cite: 3, 33].
* [cite_start]**Guest Usage**: Android supports guest usage with JSON file persistence, with an optional account upgrade[cite: 2, 33]. [cite_start]Web requires login[cite: 2].
* [cite_start]**Notifications**: Daily reminders via push notifications on Android (using Firebase)[cite: 3, 33]. **Note**: Web reminders will be handled via checklists, not push notifications.
* [cite_start]**Offline Support**: Local offline support on Android for guests[cite: 3, 33].
* [cite_start]**Sync Across Devices**: Data sync across devices with MongoDB after user login[cite: 3].

### [cite_start]Recommended Enhancements (Future Considerations) [cite: 3]
* Search/filter plants by tag/type
* Optional light/dark mode
* Basic analytics: how often you're watering, most thirsty plants

### [cite_start]Use Cases [cite: 17]
* "I want to see which plants I need to water today"
* "I want to log that I fertilized my cactus last week"
* "I want to share my indoor plants list with my roommate"
* "I'm offline but still want to track my garden"

## 3. Technology Stack & Architecture

### [cite_start]Final Technology Stack [cite: 34]
* **Backend (Java Spring Boot)**:
    * [cite_start]Spring Boot (latest stable version with Gradle) [cite: 34]
    * [cite_start]MongoDB (self-hosted) [cite: 34]
    * [cite_start]Spring Security (JWT for auth) [cite: 34]
    * [cite_start]Spring Data MongoDB [cite: 34]
    * [cite_start]Lombok [cite: 17]
    * [cite_start]Gradle (Groovy DSL) [cite: 17]
* **Frontend (Web)**:
    * [cite_start]React (with TypeScript) [cite: 34]
    * [cite_start]Axios for API communication [cite: 34]
    * [cite_start]Tailwind CSS or Material UI for minimalist UI [cite: 34]
    * [cite_start]Formik + Yup (for forms) [cite: 17]
    * [cite_start]React Router [cite: 17]
* **Android App**:
    * [cite_start]Java (MVVM Architecture) [cite: 34]
    * [cite_start]Retrofit2 (for backend sync) [cite: 34]
    * [cite_start]JSON file storage for guest mode [cite: 35]
    * [cite_start]Firebase Cloud Messaging (push notifications) [cite: 35]
    * [cite_start]Image loading: Glide or Picasso (will be used for images regardless of storage method) [cite: 17, 35]
    * [cite_start]Gson [cite: 17]

### [cite_start]App Architecture Overview [cite: 4, 34]
1.  [cite_start]**Frontend (Web)**: React (with TypeScript), Tailwind CSS or Material UI for UI, Axios for API calls, JWT token-based auth (stored in memory or secure local storage)[cite: 4].
2.  [cite_start]**Backend (Java, Spring Boot)**: Exposed via REST API, MongoDB for persistence (Spring Data MongoDB), Gradle project with multi-module structure[cite: 4].
3.  [cite_start]**Android App (Native Java)**: Uses local file storage (JSON) for guest mode, Retrofit2 for HTTP communication with backend, Firebase for push notifications, MVVM architecture (LiveData, ViewModel, Repository)[cite: 4].

### [cite_start]Object-Oriented Design Principles [cite: 35]
* [cite_start]**Rich Domain Models**: Business logic lives inside objects like `Plant`, `Schedule`, and `PlantList`[cite: 35, 18].
* [cite_start]**Encapsulation**: Methods like `needsWatering()` live inside the domain objects[cite: 35, 12, 21].
* **Composition & Inheritance**:
    * [cite_start]`Plant` has `Schedule`, `CareEvent` list[cite: 36, 6].
    * [cite_start]`CareEvent` is an abstract base class with concrete subclasses (e.g., `WateringEvent`, `TransplantEvent`, `FertilizationEvent`)[cite: 36, 11, 9].
* [cite_start]**Access Control Logic**: `PlantList` handles user permissions with `isUserAllowed(user)`[cite: 37, 14].
* [cite_start]**Factory Pattern**: `CareEvent Factory` creates the correct event type[cite: 38, 13, 25].
* **Repository + Service + Controller Pattern**:
    * [cite_start]`PlantRepository`: data access (MongoDB or local JSON file) [cite: 25]
    * [cite_start]`PlantService`: business logic (`plant.needsWatering()`) [cite: 25]
    * [cite_start]`PlantController`: expose REST API or Android ViewModel [cite: 25]

### [cite_start]UML Object Model (Summarized) [cite: 38]
* [cite_start]`Plant`: contains metadata and care history [cite: 38, 6]
* [cite_start]`Schedule`: watering frequency logic [cite: 38, 5]
* [cite_start]`CareEvent`: abstract base class for events [cite: 38, 5]
* [cite_start]`PlantList`: owns and shares plants between users [cite: 38, 8]
* [cite_start]`User`: owns or collaborates on lists [cite: 38, 8]
* [cite_start]`Frequency`, `CareEventType`: enums [cite: 38, 5]
* [cite_start]`CareEvent Factory`: creates specific events [cite: 38, 10]

### [cite_start]Gradle Project Structure [cite: 15, 38]

ist-durstig/
├── backend/                  # Java Spring Boot
│   ├── build.gradle
│   └── src/main/java/com/istdurstig/
│       ├── controller/
│       ├── model/
│       ├── repository/
│       └── service/
├── android-app/              # Native Android App (Java)
│   └── app/src/main/java/com/istdurstig/
│       ├── ui/
│       ├── viewmodel/
│       ├── model/
│       └── data/
├── web-frontend/             # React App (Web UI)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── services/ (API)
│   └── package.json
└── settings.gradle

**Note:** The `shared/` module for shared domain models will **not** be implemented at this stage, keeping models separate for initial development simplicity.

## 4. Development Roadmap & Deployment

### [cite_start]Development Plan (Step-by-Step) [cite: 16, 39]
1.  [cite_start]**Phase 1 - Planning & Setup**: Initialize Git monorepo, Setup Gradle backend with Spring Boot, Setup React app (Vite/CRA), Create basic Android app scaffolding[cite: 16].
2.  [cite_start]**Phase 2 - Backend API**: Define Models & DTOs, Implement User/Auth Controller, CRUD for Plant, List, Events, MongoDB Integration (Spring Data MongoDB), JWT Auth Middleware[cite: 16].
3.  [cite_start]**Phase 3 - Web Frontend**: Auth UI: Sign in / Register, HomePage (plants due today), My Garden page with list creation/sharing, Add/edit plant form with image upload, Axios API client + token handling[cite: 16].
4.  [cite_start]**Phase 4 - Android App**: JSON local storage for guest users, UI screens: Home, MyGarden, AddPlant, Profile, Retrofit integration, Firebase push notification integration, Option to upgrade to login + sync[cite: 16, 17].
5.  **Phase 5 - Deployment**:
    * [cite_start]Deploy Web to Vercel[cite: 17, 39].
    * [cite_start]Deploy backend to VPS or cloud provider[cite: 17, 39].
    * [cite_start]Host MongoDB securely (self-hosted)[cite: 17, 39]. **Deployment Note**: MongoDB will be installed directly on the same cloud VPS as the backend for ease of launch and free/direct deployment.
    * [cite_start]Enable HTTPS and security[cite: 17].
    * [cite_start]Prepare Android for production release (Play Store or direct APK)[cite: 39].

### [cite_start]Included Deliverables [cite: 40]
* [cite_start]OO-compliant UML Class Diagram [cite: 40]
* [cite_start]Domain-driven backend model [cite: 40]
* [cite_start]Android-ready design with offline support [cite: 40]
* [cite_start]Shared list and reminder logic [cite: 40]
* [cite_start]Secure auth and data sync system [cite: 40]
