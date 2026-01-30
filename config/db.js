import { connect } from 'mongoose';
import logger from './logger.js';

connect(ENV.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Conexión exitosa a MongoDB'))
  .catch(err => logger.error('Error al conectar a MongoDB:', err));