import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Mevcut dosya yolunu elde et
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload klasörünü belirle
const uploadDirectory = path.join(__dirname, '../uploads'); // Bir üst dizine geçiş.


// Multer'ı konfigüre et
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
