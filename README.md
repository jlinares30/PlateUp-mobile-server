# PlateUp! Mobile App Backend (NestJS)

> A robust, modular RESTful API built with NestJS, TypeScript, and MongoDB to power a modern Recipe & Meal Planning mobile application.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)
![NestJS](https://img.shields.io/badge/NestJS-v11-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg)

---

## Overview

This backend service serves as the core infrastructure for the PlateUp! mobile application focused on culinary management. It provides secure JWT authentication, comprehensive recipe management, ingredient tracking, pantry management, shopping lists, and personalized meal planning capabilities.

Migrated to NestJS for enhanced architecture, maintainability, strong typing with TypeScript, dependency injection, and modular scalability.

### Key Features

- **Secure Authentication**: JWT-based auth system (Register, Login, Password Reset, Profile Management).
- **Recipe Management**: Full CRUD, image uploads, ingredient matching percentage algorithm, and favorite toggles.
- **Ingredient Tracking**: Inventory management and ingredient categorizations.
- **Meal Planning**: Create, update, clone, and manage weekly meal plans.
- **Pantry Management**: Track items in your pantry, quantities, and units.
- **Shopping List**: Dynamic shopping list generation and item state toggles.
- **Stats & Dashboard**: Aggregated user statistics and analytics.
- **Cloudinary Integration**: Optimized cloud image uploads with automatic compression, resizing, and memory/disk buffer support.

---

## Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) (v11)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) (`@nestjs/mongoose`)
- **Authentication**: Passport JWT (`@nestjs/passport`, `passport-jwt`, `bcrypt`)
- **Validation**: `class-validator` & `class-transformer`
- **File Uploads**: Multer memory buffer + [Cloudinary](https://cloudinary.com/) SDK
- **Environment Config**: `@nestjs/config`

---

## Project Structure

```bash
src/
├── auth/             # Auth controller, service, JWT strategy, guards & DTOs
├── common/           # Common utilities (CloudinaryService module)
├── ingredients/      # Ingredients module, schemas & DTOs
├── meal-plans/       # Meal Plans module, schemas & DTOs
├── pantry/           # Pantry items module, schemas & DTOs
├── recipes/          # Recipes module, schemas & DTOs
├── shopping-list/    # Shopping List module, schemas & DTOs
├── stats/            # Statistics dashboard module
├── users/            # Users schema & management
├── app.module.ts     # Main application module
└── main.ts           # Application entry point
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** or **pnpm**
- **MongoDB** connection string (MongoDB Atlas or local)

---

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jlinares30/PlateUp-mobile-server.git
   cd app-mobile-prototype-1
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   PORT=5001
   DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/plateup?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

---

### Running the Server Locally

- **Development Mode** (with hot-reload):
  ```bash
  pnpm run start:dev
  # or npm run start:dev
  ```

- **Build Project**:
  ```bash
  pnpm run build
  # or npm run build
  ```

- **Production Mode**:
  ```bash
  pnpm run start:prod
  # or npm run start:prod
  ```

Server will run at `http://localhost:5001` (or your configured `PORT`).

---

## Production Deployment (e.g. Render)

When deploying to Render or similar PaaS platforms:

| Config | Value |
| :--- | :--- |
| **Build Command** | `pnpm install && pnpm run build` |
| **Start Command** | `pnpm run start:prod` |
| **Environment Variables** | Set `DATABASE_URL`, `JWT_SECRET`, `CLOUDINARY_*`, `PORT` |

---

## API Documentation (Swagger / OpenAPI)

Interactive documentation with Swagger UI is integrated and available at:
- **URL**: `http://localhost:<PORT>/api/docs` (default: `http://localhost:3000/api/docs` o `5001/api/docs`)
- **Features**:
  - Full schema inspection of all DTOs and responses.
  - Interactive test execution for all endpoints directly from the browser.
  - JWT Bearer Authentication support with the `Authorize` button.

---

## API Endpoints

### Auth (`/api/auth`)
- `POST /api/auth/register` - Register a new user (supports optional profile image)
- `POST /api/auth/login` - Authenticate user & receive JWT
- `POST /api/auth/reset-password` - Reset user password
- `PUT /api/auth/profile` - Update user profile (supports image upload)

### Ingredients (`/api/ingredients`)
- `GET /api/ingredients` - List all ingredients
- `GET /api/ingredients/:id` - Get ingredient details
- `POST /api/ingredients` - Add new ingredient (supports image upload)

### Recipes (`/api/recipes`)
- `GET /api/recipes` - Get all recipes (public & system)
- `GET /api/recipes/my` - Get logged-in user's recipes
- `GET /api/recipes/favorites/all` - Get user's favorite recipes
- `GET /api/recipes/:id` - Get recipe details
- `POST /api/recipes` - Create a recipe (supports image upload)
- `PUT /api/recipes/:id` - Update a recipe (supports image upload)
- `DELETE /api/recipes/:id` - Delete a recipe
- `POST /api/recipes/by-ingredients` - Filter & rank recipes by available ingredients
- `POST /api/recipes/:id/favorite` - Toggle favorite status

### Meal Plans (`/api/meal-plans`)
- `GET /api/meal-plans` - Retrieve public/system meal plans
- `GET /api/meal-plans/my` - Retrieve user's meal plans
- `GET /api/meal-plans/:id` - Get meal plan details
- `POST /api/meal-plans` - Create a new plan (supports image upload)
- `POST /api/meal-plans/clone` - Clone an existing meal plan
- `PUT /api/meal-plans/:id` - Update a meal plan
- `DELETE /api/meal-plans/:id` - Delete a meal plan

### Pantry (`/api/pantry`)
- `GET /api/pantry` - Get user's pantry items
- `POST /api/pantry` - Add item to pantry
- `PUT /api/pantry/:itemId` - Update pantry item quantity/unit
- `DELETE /api/pantry/:itemId` - Remove item from pantry

### Shopping List (`/api/shopping-list`)
- `GET /api/shopping-list` - Get shopping list items
- `POST /api/shopping-list` - Add item to list
- `PUT /api/shopping-list/:itemId` - Update list item
- `DELETE /api/shopping-list/clear` - Clear entire list
- `DELETE /api/shopping-list/:itemId` - Remove item from list

### Stats (`/api/stats`)
- `GET /api/stats` - Get user dashboard statistics

---

## Author

Developed by **Jorge Linares**.
