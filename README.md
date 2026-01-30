# 📱 PlateUp! Mobile App Backend

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
- **Middleware**: `cors` for cross-origin resource sharing
- **Logging**: [Pino](https://getpino.io/) for high-performance logging
- **Storage**: [Cloudinary](https://cloudinary.com/) for cloud image management

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
    PORT=5001
    DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/miapp?retryWrites=true&w=majority
    JWT_SECRET=secret_key
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
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

### 🔐 Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user
- `PUT /api/auth/profile` - Update user profile (supports image upload)

### 🥑 Ingredients
- `GET /api/ingredients` - List all ingredients
- `GET /api/ingredients/:id` - Get ingredient details
- `POST /api/ingredients` - Add new ingredient (supports image upload)

### 🥗 Recipes
- `GET /api/recipes` - Get all recipes (public & system)
- `GET /api/recipes/my` - Get logged-in user's recipes
- `GET /api/recipes/favorites/all` - Get user's favorite recipes
- `GET /api/recipes/:id` - Get recipe details
- `POST /api/recipes` - Create a recipe (supports image upload)
- `PUT /api/recipes/:id` - Update a recipe
- `DELETE /api/recipes/:id` - Delete a recipe
- `POST /api/recipes/by-ingredients` - Filter recipes by available ingredients
- `POST /api/recipes/:id/favorite` - Toggle favorite status

### 📅 Meal Plans
- `GET /api/meal-plans` - Retrieve public/system meal plans
- `GET /api/meal-plans/my` - Retrieve user's meal plans
- `GET /api/meal-plans/:id` - Get meal plan details
- `POST /api/meal-plans` - Create a new plan (supports image upload)
- `POST /api/meal-plans/clone` - Clone an existing meal plan
- `PUT /api/meal-plans/:id` - Update a meal plan
- `DELETE /api/meal-plans/:id` - Delete a meal plan

### 🥫 Pantry
- `GET /api/pantry` - Get user's pantry items
- `POST /api/pantry` - Add item to pantry
- `PUT /api/pantry/:itemId` - Update pantry item (quantity, unit)
- `DELETE /api/pantry/:itemId` - Remove item from pantry

### 🛒 Shopping List
- `GET /api/shopping-list` - Get shopping list
- `POST /api/shopping-list` - Add item to list
- `PUT /api/shopping-list/:itemId` - Update list item
- `DELETE /api/shopping-list/clear` - Clear entire list
- `DELETE /api/shopping-list/:itemId` - Remove item from list

### 📊 Stats
- `GET /api/stats` - Get user dashboard statistics

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
