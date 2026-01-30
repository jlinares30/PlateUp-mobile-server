import logger from './logger.js';

if (process.env.NODE_ENV !== 'production') {
  try {
    process.loadEnvFile(); 
  } catch (err) {
    logger.warn("No se encontró archivo .env local, usando variables de entorno del sistema.");
  }
}

export const ENV = {
  PORT: process.env.PORT || 5001,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
};