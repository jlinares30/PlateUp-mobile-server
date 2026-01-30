import cors from 'cors';
import express from "express";
import mongoose from "mongoose";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ENV } from "./config/env.js";
import authRoutes from './routes/authRoutes.js';
import ingredientsRoutes from './routes/ingredientsRoutes.js';
import mealPlanRoutes from './routes/mealPlanRoutes.js';
import pantryRoutes from './routes/pantryRoutes.js';
import recipesRoutes from './routes/recipeRoutes.js';
import shoppingListRoutes from './routes/shoppingListRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import logger from './config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

/* ================== GLOBAL MIDDLEWARES ================== */

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Logger
app.use((req, res, next) => {
  logger.info('📦 Content-Type:', req.headers['content-type']);
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ⚠️ Body parsers SOLO para JSON / urlencoded
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

/* ================== ROUTES ================== */

app.use("/api/auth", authRoutes);
app.use("/api/ingredients", ingredientsRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/meal-plans", mealPlanRoutes);
app.use("/api/pantry", pantryRoutes);
app.use("/api/shopping-list", shoppingListRoutes);
app.use("/api/stats", statsRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Mongo conectado" });
});

/* ================== START SERVER ================== */

async function start() {
  try {
    await mongoose.connect(ENV.DATABASE_URL, {
      dbName: "miapp",
    });

    logger.info("✅ Conectado a MongoDB");

    app.listen(ENV.PORT, "0.0.0.0", () => {
      logger.info(`🚀 Servidor corriendo en http://0.0.0.0:${ENV.PORT}`);
    });

  } catch (err) {
    logger.error("❌ Error conectando a MongoDB:", err.message);
    process.exit(1);
  }
}

start();
