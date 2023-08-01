# KTrust-task CRUD app

This is a simple CRUD app that runs with:

**Frontend:**
- React with TypeScript
- [Recoil](https://recoiljs.org/) as the state management
- Bootstrap for styling

**Backend:**
- Express.js with JWT token for server-side authentication and authorization
- MongoDB and Mongoose for database

**Docker** for containerization

## Description

This project is a simple CRUD (Create, Read, Update, Delete) application that allows users to perform basic operations on user data. The frontend is built with React, TypeScript, and Recoil, providing a smooth user experience and efficient state management. The backend is powered by Express.js, MongoDB, and Mongoose for data storage and retrieval. It uses JWT (JSON Web Token) for secure server-side authentication.

## Features

- User Authentication: Secure user authentication and authorization using JWT token.
- User Management: CRUD operations for managing user data (Create, Read, Update, Delete).
- Admin and User Roles: Admins can create, read, update, and delete users, while regular users can only view other users.
- Responsive Design: The frontend is designed to be responsive and user-friendly across different devices.

## Prerequisites

Before running the application, ensure you have the following dependencies installed on your system:

- Docker
- Docker Compose

## How to Run

1. Clone the repository to your local machine:

```bash
git clone https://github.com/noambenshoham/KTrust-task.git
```
2. Navigate to the project root directory:
```
cd KTrust-task
```
3. Build and run the Docker containers using Docker Compose:

```
docker-compose up -d
```

The application will be available at the following URLs:

Frontend Client: http://localhost:5137

Backend API: http://localhost:3000

By running the docker-compose up -d command, Docker Compose will automatically build and start the frontend and backend services in separate containers. The -d flag runs the containers in detached mode, which means they will continue to run in the background.

Please ensure that you have Docker and Docker Compose installed on your system before running the application.