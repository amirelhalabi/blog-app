# Blog Application

## Overview

This project is a full-stack blog application consisting of both frontend and backend components. It allows users to manage blog posts with features for creating, updating, and deleting posts. The application uses a React frontend and a Node.js v16 and Express.js backend with MongoDB for data storage.

## Project Structure

### Frontend (blog-app-frontend)

- **src/components**: Contains React components for the application.
- **src/App.js**: Main component that handles routing and overall structure.
- **src/index.js**: Entry point for the React application.
- **src/index.css**: Global styles for the frontend.

### Backend (blog-app-backend)

- **models**: Contains Mongoose schemas and models.
  - **Posts.js**: Defines the schema for blog posts (title, content, author, createdAt).
- **routes**: Contains Express routes for handling API requests.
  - **posts.js**: Router for managing blog post-related API endpoints.
- **tests**: Contains unit and integration tests for the backend.
- **node_modules**: Contains project dependencies (not included in version control).
- **server.js**: The main entry point for the server, sets up Express, connects to MongoDB, and starts the server.
- **.env**: Environment variables including MongoDB connection string.
- **package.json**: Dependencies and scripts for the backend.
- **package-lock.json**: Lock file for dependencies.

## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- MongoDB (for local development)

### Setup

1. **Clone the repository**

   ```
   git clone https://github.com/yourusername/blog-app.git
   cd blog-app
### Install dependencies

2. **Install dependencies**

    For the frontend:
    ```
    cd blog-app-frontend
    npm install
    ```
    For the backend:
    ```
    cd ../blog-app-backend
    npm install
3. **Set up environment variables**

    Create a `.env` file IF NOT EXISTO=ING in the blog-app-backend directory (blog-app-backend/.env) with the following content to access the online database:
    
    MONGODB_URI=mongodb+srv://amirhalabi:Amir.2001%24@cluster0.z8s0m.mongodb.net/myDatabaseName?retryWrites=true&w=majority&appName=Cluster0
    
4. **Run the application**

    Start the backend server:
    
    cd blog-app-backend
    npm start
    Start the frontend application:
    
    cd ../blog-app-frontend
    npm start
5. **Run tests**

    To run tests for the backend, use:
    
    cd blog-app-backend
    npm test
## Testing

#### Backend Tests

Tests are located in the tests folder under blog-app-backend. You can run them using Jest:

cd blog-app-backend 
npm test   
## Contact

For any questions or feedback, please contact [amir619halabi@gmail.com](mailto:amir619halabi@gmail.com).
