# 📱 Mobile App Prototype Backend

> A robust RESTful API designed to power a modern Recipe & Meal Planning mobile application.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)
![Express](https://img.shields.io/badge/express-v5-blue)
![MongoDB](https://img.shields.io/badge/mongodb-connected-green)

## 📖 Overview

This backend service serves as the core infrastructure for a mobile application focused on **culinary management**. It provides secure authentication, comprehensive recipe management, ingredient tracking, and personalized meal planning capabilities. Built with performance and scalability in mind using Node.js and MongoDB.

### ✨ Key Features

- **🔐 Secure Authentication**: JWT-based auth system (Register/Login).
- **🥗 Recipe Management**: CRUD operations for recipes with detailed metadata.
- **🥑 Ingredient Tracking**: Manage inventory and ingredient details.
- **📅 Meal Planning**: Organize weekly meal plans efficiently.
- **☁️ Cloud Database**: Connected to MongoDB (compatible with Neon/Serverless implementations).

---

## 🛠️ Technology Stack

This project leverages a modern JavaScript stack:

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) (v5)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: `jsonwebtoken` & `bcrypt`
- **Environment**: `dotenv` for configuration
- **Middleware**: `cors` for cross-origin resource sharing

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** or **pnpm**
- A **MongoDB** connection string (Atlas or local)

### 📥 Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd app-mobile-prototype-1
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory based on your configuration needs.
    ```env
    PORT=3000
    DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
    JWT_SECRET=your_super_secret_key
    ```

### ▶️ Running the Server

- **Development Mode** (with hot-reload):
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

Server will start at: `http://localhost:3000` (or your defined PORT).

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user

### Ingredients
- `GET /api/ingredients` - List all ingredients
- `POST /api/ingredients` - Add new ingredient

### Recipes
- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Create a recipe
- `GET /api/recipes/:id` - Get recipe details

### Meal Plans
- `GET /api/meal-plans` - Retrieve meal plans
- `POST /api/meal-plans` - Create a new plan

---

## 📂 Project Structure

```bash
backend/
├── config/         # DB and Env configuration
├── controllers/    # Route logic & request handling
├── models/         # Mongoose schemas (User, Recipe, etc.)
├── routes/         # API Route definitions
├── middlewares/    # Custom middlewares (Auth, etc.)
└── server.js       # App entry point
```

---

## 👤 Author

Developed by **Jorge Linares** as part of a professional mobile development portfolio.

---

<p align="center">
  <sub>Built with ❤️ and ☕</sub>
</p>
