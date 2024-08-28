const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}-${path.basename(file.originalname)}`);
    }
});

// Configuración de multer
const upload = multer({ storage });

module.exports = upload;
