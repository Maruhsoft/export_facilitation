# BrandApe - Export Trade Facilitation System

**BrandApe** is a comprehensive, production-ready export trade facilitation system designed to connect buyers, sellers, and freight agencies in a seamless, secure, and efficient digital marketplace. It manages the entire trade lifecycle, from initial request and negotiation to payment, shipment, and final settlement.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Containerized Development with Docker](#containerized-development-with-docker)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [User Action Flows](#user-action-flows)

---

## Features

- **Multi-Role Architecture**: Tailored dashboards and functionalities for Buyers, Sellers, Freight Agencies, Payment Admins, and Super Admins.
- **Secure Authentication**: JWT-based authentication, password hashing (bcrypt), and role-based access control (RBAC).
- **End-to-End Trade Workflow**: Complete lifecycle management including requests, negotiations, contracts, and digital signatures.
- **Integrated Payments & Escrow**: Supports automatic (gateway) and manual payments, with an optional escrow system to secure funds.
- **Freight & Shipment Management**: Freight agencies can list services, provide quotes, and update shipment tracking in real-time.
- **Dispute Resolution**: A built-in system for raising and resolving trade disputes with evidence upload and communication logs.
- **Comprehensive Dashboards & Analytics**: Role-specific KPIs, reporting, and data exports.
- **System Configuration**: Super admins can manage system-wide settings, fees, user roles, and permissions.

---

## Project Structure

The project is a monorepo with the frontend and backend in the same root directory.

```
BrandApe/
├── .dockerignore
├── .github/
├── backend/
│   ├── .dockerignore
│   ├── Dockerfile
│   └── ...
├── src/
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── package.json
└── README.md
```

---

## Technology Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB (or Amazon DocumentDB in production)
- **Containerization**: Docker, Docker Compose
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **API Documentation**: Swagger (OpenAPI)
- **CI/CD**: GitHub Actions

---

## Prerequisites

- Node.js (v18.x or later)
- npm or yarn
- MongoDB installed and running locally (or a cloud instance like MongoDB Atlas)
- Docker and Docker Compose
- Git

---

## Local Development Setup

Follow these steps for a traditional setup without Docker.

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd BrandApe
```

### 2. Backend Setup

The backend server runs on port `5001` by default.

a. **Navigate to the backend directory:**
```bash
cd backend
```

b. **Install dependencies:**
```bash
npm install
```

c. **Create environment file:**
Create a `.env.development` file in the `backend` directory and add the required variables.

### 3. Frontend Setup

The frontend Vite server runs on port `5173` by default.

a. **Navigate to the root directory:**
```bash
cd .. 
```

b. **Install dependencies:**
```bash
npm install
```

c. **Create environment file:**
Create a `.env.development` file in the root directory and add the backend API URL.
```env
VITE_API_URL=http://localhost:5001/api
```

---

## Containerized Development with Docker

Using Docker is the recommended way to run the application locally. It sets up the frontend, backend, and database in one step.

### 1. Prerequisites
Ensure you have Docker and Docker Compose installed on your machine.

### 2. Environment Configuration
The Docker setup uses the environment variables defined in `docker-compose.yml`. You can modify them there if needed, for example, to change the `ADMIN_EMAIL` or `ADMIN_PASSWORD`.

### 3. Build and Run the Application
From the root directory of the project, run the following command:

```bash
docker-compose up --build
```

- `--build` forces Docker to rebuild the images if there are any changes to the `Dockerfile`s or source code.
- This command will:
  - Pull the MongoDB image and create a database container.
  - Build the backend Docker image and start the backend container.
  - Build the frontend Docker image (using a multi-stage build with Nginx) and start the frontend container.
  - Connect all containers on a shared Docker network.

### 4. Accessing the Application
- **Frontend**: Open your browser and navigate to `http://localhost:5173`
- **Backend API**: The API is available at `http://localhost:5001`. The frontend container proxies requests from `/api` to the backend.
- **API Documentation**: The interactive Swagger/OpenAPI documentation is available at `http://localhost:5001/api-docs`.
- **Database**: The MongoDB instance is accessible on `localhost:27017`.

### 5. Seeding the Database with Docker
To seed the database while the containers are running, open a new terminal and execute the following command:

```bash
docker-compose exec backend npm run seed
```

This runs the `npm run seed` command inside the already running `backend` container.

### 6. Stopping the Application
To stop all running containers, press `Ctrl + C` in the terminal where `docker-compose up` is running. To remove the containers, run:
```bash
docker-compose down
```

---

## Running the Application

(For non-Docker setup) You need to run the backend and frontend servers in separate terminal windows.

**Terminal 1: Start the Backend Server**
```bash
cd backend
npm run dev
```

**Terminal 2: Start the Frontend Development Server**
```bash
# From the root directory
npm run dev
```

---

## API Documentation

The project includes interactive API documentation using Swagger/OpenAPI. Once the application is running (either locally or with Docker), you can access the documentation at:

**[http://localhost:5001/api-docs](http://localhost:5001/api-docs)**

The documentation provides detailed information on all available endpoints, including request parameters, response schemas, and authorization requirements. You can also use the interface to make live API calls to the backend.

---

## User Action Flows

(User action flow tables remain the same...)
