# Ist Durstig - Plant Care Tracker

Plant care tracking application that helps users manage their plants with custom watering schedules and collaborative plant lists.

## 🌱 Features

- **Plant Management**: Add, edit, and organize your plants with photos, tags, and notes
- **Smart Scheduling**: Custom watering frequencies (Frequent/Medium/Rare) with automatic reminders
- **Care Tracking**: Log watering, fertilizing, and transplanting events with detailed history
- **Daily Dashboard**: See which plants need attention today with beautiful statistics
- **Shared Lists**: Collaborate with roommates or family members on plant care
- **Search & Filter**: Quickly find plants by name, type, or tags
- **Responsive Design**: Beautiful interface that works on all devices
- **Secure Authentication**: JWT-based user authentication and authorization

## 🏗️ Architecture

### Backend (Java Spring Boot)
- **Framework**: Spring Boot 3.2.0 with Gradle
- **Database**: MongoDB with Spring Data MongoDB
- **Security**: Spring Security with JWT authentication
- **Architecture**: Clean Architecture with Repository-Service-Controller pattern
- **Design Patterns**: Factory pattern for care events, rich domain models

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Routing**: React Router for navigation
- **Forms**: React Hook Form with Yup validation
- **API**: Axios for HTTP communication
- **State Management**: React Context for authentication

## 📋 Prerequisites

### Required Software
- **Java Development Kit (JDK) 17 or higher**
- **Node.js 18+ and npm**
- **MongoDB 6.0+** (Community Edition)

## 📁 Project Structure
```
ist-durstig/
├── backend/                          # Spring Boot backend
│   ├── build.gradle                  # Gradle build file
│   ├── gradlew, gradlew.bat          # Gradle wrapper scripts
│   ├── settings.gradle               # Gradle settings
│   └── src/
│       ├── main/
│       │   ├── java/
│       │   │   └── istdurstig/
│       │   │       ├── controller/   # REST API controllers
│       │   │       ├── dto/          # Data Transfer Objects
│       │   │       ├── factory/      # Entity factories
│       │   │       ├── model/        # JPA entity models
│       │   │       ├── repository/   # Spring Data repositories
│       │   │       ├── security/     # Security configuration
│       │   │       └── service/      # Business logic services
│       │   └── resources/
│       │       └── application.properties  # Spring Boot config
│       └── test/                     # Unit and integration tests
├── frontend/                         # React + TypeScript frontend
│   ├── package.json                  # NPM dependencies & scripts
│   ├── tsconfig.json                 # TypeScript compiler options
│   ├── vite.config.ts                # Vite build config
│   ├── tailwind.config.js            # Tailwind CSS settings
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── contexts/                 # React Context providers (AuthContext)
│   │   ├── pages/                    # Page-level views (Dashboard, Login, etc.)
│   │   ├── services/                 # API client functions
│   │   └── types/                    # TypeScript type definitions
│   ├── index.html                    # HTML template
│   └── main.tsx                      # Frontend entry point
├── LICENSE                           # Project license file
└── README.md                         # Project overview and instructions
```

## 🛠️ Available Scripts

### Backend (Gradle)
```bash
# Set your MongoDB URI environment variable (replace with your credentials)
# export MONGODB_URI="mongodb://<username>:<password>@cluster0.mongodb.net/istdurstig?retryWrites=true&w=majority"
# Build the application
./gradlew build

# Run the application (ensure MONGODB_URI is set)
./gradlew bootRun

# Run tests
./gradlew test

# Clean build artifacts
./gradlew clean
```

### Frontend (npm)
```bash
# Install dependencies
npm install
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Plant Management
- `GET /api/plants` - Get all user plants
- `POST /api/plants` - Create new plant
- `PUT /api/plants/{id}` - Update plant
- `DELETE /api/plants/{id}` - Delete plant
- `GET /api/plants/due-today` - Get plants due for care today

### Care Events
- `POST /api/plants/{id}/care-events` - Log care event

### Plant Lists
- `GET /api/plant-lists` - Get all user plant lists
- `POST /api/plant-lists` - Create new plant list
- `PUT /api/plant-lists/{id}` - Update plant list
- `DELETE /api/plant-lists/{id}` - Delete plant list


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

**Happy Plant Caring! 🌱**

For support or questions, please open a Discussions in the repository.