// multerConfig.js
import Multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear carpeta uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('✅ Carpeta uploads creada');
}

// ✅ ALMACENAMIENTO LOCAL (temporal para testing)
const storage = Multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('💾 Guardando en disco local...');
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = `recipe-${uniqueSuffix}${ext}`;
        console.log('📝 Archivo:', filename);
        cb(null, filename);
    }
});

const upload = Multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
    fileFilter: (req, file, cb) => {
        console.log('📋 Validando archivo:', file.mimetype);
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo imágenes'));
        }
    }
});

export default upload;