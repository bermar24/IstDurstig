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
- **IntelliJ IDEA** (Ultimate or Community Edition)
- **Git** (for version control)

### IntelliJ IDEA Requirements

#### Required SDKs:
- **Java SDK 17+** (Oracle JDK, OpenJDK, or Amazon Corretto)
- **Node.js 18+**

#### Required Plugins:
- **Spring Boot** (usually pre-installed in Ultimate)
- **Gradle** (usually pre-installed)
- **JavaScript and TypeScript** (usually pre-installed)
- **Tailwind CSS** (recommended for better CSS support)
- **MongoDB Plugin** (optional, for database management)

#### Required IntelliJ Modules:
- **Java Enterprise**
- **Spring**
- **Gradle**
- **JavaScript and TypeScript**
- **Database Tools and SQL** (for MongoDB support)
- **Version Control Systems**

## 📁 Project Structure
```
ist-durstig/
├── backend/                          # Spring Boot Backend
│   ├── build.gradle                  # Gradle Build File and backend sources
│   └── src/main/java/com/istdurstig/ # Java source code
├── frontend/                         # React + TypeScript Frontend
│   ├── package.json                  # Frontend dependencies and scripts
│   ├── src/                          # React application source code
│   └── vite.config.ts, tailwind.config.js, etc.
├── LICENSE                           # Project license
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

## 🔍 Troubleshooting

### Common Issues and Solutions

1. **MongoDB Connection Failed**
   - Ensure MongoDB service is running
   - Check connection string in `application.properties`
   - Verify MongoDB is accessible on localhost:27017

2. **Port Already in Use**
   - Backend (8080): Change `server.port` in `application.properties`
   - Frontend (5173): Vite will automatically try the next available port

3. **Gradle Build Failed**
   - Ensure Java 17+ is installed and configured
   - Run `./gradlew clean build` to clean and rebuild

4. **Frontend Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

5. **CORS Issues**
   - Backend is configured to allow all origins in development
   - For production, update CORS configuration in `WebSecurityConfig.java`

## 🚀 Production Deployment

### Backend Deployment
1. Build the JAR file: `./gradlew bootJar`
2. Deploy to your preferred cloud platform (AWS, Heroku, DigitalOcean)
3. Configure production MongoDB instance
4. Set environment variables for production

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred hosting platform
3. Update API base URL for production backend

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