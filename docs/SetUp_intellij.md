
## 🚀 Step-by-Step Setup Guide for IntelliJ IDEA

### Step 1: Environment Setup

1. **Install Java JDK 17+**
   ```bash
   # Verify Java installation
   java -version
   javac -version
   ```

2. **Install Node.js 18+**
   ```bash
   # Verify Node.js installation
   node --version
   npm --version
   ```

3. **Install MongoDB**
    - Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
    - Follow installation instructions for your OS
    - Start MongoDB service:
   ```bash
   # Windows (as service)
   net start MongoDB
   
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Linux (systemd)
   sudo systemctl start mongod
   ```

4. **Verify MongoDB is running**
   ```bash
   # Connect to MongoDB shell
   mongosh
   # Should connect successfully to mongodb://127.0.0.1:27017
   ```

### Step 2: Clone and Open Project in IntelliJ IDEA

1. **Clone the repository** (or extract the provided ZIP file)
   ```bash
   git clone <repository-url>
   cd ist-durstig
   ```

2. **Open in IntelliJ IDEA**
    - Launch IntelliJ IDEA
    - Click "Open" and select the project root directory
    - IntelliJ will automatically detect it as a Gradle project

3. **Configure Project SDK**
    - Go to `File` → `Project Structure` → `Project`
    - Set Project SDK to Java 17+
    - Set Project language level to "17 - Sealed types, always-strict floating-point semantics"

### Step 3: Backend Setup (Spring Boot)

1. **Configure Gradle**
    - IntelliJ should automatically import Gradle dependencies
    - If not, click the Gradle refresh button in the Gradle tool window
    - Wait for all dependencies to download

2. **Verify Spring Boot Configuration**
    - Navigate to `backend/src/main/resources/application.properties`
    - Ensure MongoDB connection settings are correct:
   ```properties
   spring.data.mongodb.host=localhost
   spring.data.mongodb.port=27017
   spring.data.mongodb.database=istdurstig
   ```

3. **Run the Backend Application**
    - Navigate to `backend/src/main/java/com/istdurstig/IstDurstigApplication.java`
    - Right-click and select "Run 'IstDurstigApplication'"
    - Or use the green play button in the gutter
    - The application should start on `http://localhost:8080`

4. **Verify Backend is Running**
    - Check the console output for "Started IstDurstigApplication"
    - Test the health endpoint: `http://localhost:8080/api/auth/signin` (should return 400 for empty request)

### Step 4: Frontend Setup (React)

1. **Open Terminal in IntelliJ**
    - Go to `View` → `Tool Windows` → `Terminal`
    - Navigate to the project root directory

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
    - The frontend will start on `http://localhost:5173`
    - IntelliJ will show the URL in the terminal

4. **Configure IntelliJ for React Development**
    - Go to `File` → `Settings` → `Languages & Frameworks` → `JavaScript`
    - Set JavaScript language version to "ECMAScript 6+"
    - Enable "Prefer TypeScript service" for better TypeScript support

### Step 5: Database Setup

1. **Create MongoDB Database**
    - MongoDB will automatically create the `istdurstig` database when the application first connects
    - Collections will be created automatically when data is first inserted

2. **Verify Database Connection**
    - Check the Spring Boot console logs for successful MongoDB connection
    - Look for: "Cluster created with settings"

### Step 6: Testing the Application

1. **Access the Application**
    - Frontend: `http://localhost:5173`
    - Backend API: `http://localhost:8080`

2. **Create a Test Account**
    - Navigate to the Register page
    - Create a new user account
    - Login with your credentials

3. **Test Core Features**
    - Add a new plant
    - Create a plant list
    - Log a care event
    - Check the dashboard for plants due today

## 🔧 Development Configuration

### IntelliJ IDEA Run Configurations

#### Backend Configuration:
- **Name**: "Spring Boot App"
- **Main class**: `com.istdurstig.IstDurstigApplication`
- **Module**: `backend.main`
- **JRE**: Java 17+

#### Frontend Configuration:
- **Name**: "React Dev Server"
- **Configuration type**: npm
- **Command**: `run`
- **Scripts**: `dev`
