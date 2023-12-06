// validaciones.js

const validator = require("validator");


const validarTituloContenido = (titulo, contenido) => {
    let errores = [];

    if (titulo === undefined || contenido === undefined) {
        errores.push("Se esperaba recibir tanto título como contenido");
        return errores;
    }

    return errores;
};

module.exports = {
    validarTituloContenido
};


