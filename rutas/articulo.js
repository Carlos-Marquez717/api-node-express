const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./imagen/articulos");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = function (req, file, cb) {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const extname = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extname)) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten archivos con extensiones .jpg, .jpeg, .png o .gif"));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('imagen');
const ArticuloControlador = require("../controladores/Articulo.js");

//rutas de pruebas
router.get("/ruta-de-prueba", ArticuloControlador.prueba);

//rutas de API_REST - CRUD
router.post("/crear",ArticuloControlador.crear);
//router.post("/articulos", upload.single("imagen"), ArticuloControlador.crear);
router.get("/articulos", ArticuloControlador.listar);
router.get("/articulos/:id", ArticuloControlador.consultarArticulo);
router.delete("/articulos/:id", ArticuloControlador.eliminarArticulo);
router.put("/articulos/:id", ArticuloControlador.actualizarArticulo);


// Después de tus rutas Multer
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ status: 'error', mensaje: err.message });
    } else if (err) {
        return res.status(500).json({ status: 'error', mensaje: err.message });
    }
    next();
});



module.exports = router;
