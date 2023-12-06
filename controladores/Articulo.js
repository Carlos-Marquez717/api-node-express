const Articulo = require("../modelos/Articulo");
const validaciones = require("../helpers/validaciones");

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "soy una acción controlador articulo"
    });
};

const crear = async (req, res) => {
    try {
        const parametros = req.body;

        const erroresValidacion = validaciones.validarTituloContenido(parametros.titulo, parametros.contenido);

        if (erroresValidacion.length > 0) {
            throw new Error(erroresValidacion.join(", "));
        }

        const articulo = new Articulo({
            titulo: parametros.titulo,
            contenido: parametros.contenido,
            // No incluir imagen si no la estás utilizando
        });

        const articuloGuardado = await articulo.save();

        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "GUARDADO CON ÉXITO"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        });
    }
};

const listar = async (req, res) => {
    try {
        const resultados = await Articulo.find({}).sort({ fecha: -1 }).exec();

        return res.status(200).json({
            status: "success",
            resultados: resultados,
            mensaje: "Consulta exitosa"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Error en la consulta",
            error: error.message
        });
    }
};

const consultarArticulo = async (req, res) => {
    try {
        const articuloId = req.params.id;
        const articulo = await Articulo.findById(articuloId).exec();

        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articulo,
            mensaje: "Consulta exitosa"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error en la consulta",
            error: error.message
        });
    }
};

const eliminarArticulo = async (req, res) => {
    try {
        const id = req.params.id;
        const articulo = await Articulo.findByIdAndDelete(id).exec();

        if (!articulo) {
            return res.status(404).json({
                status: 'error',
                mensaje: 'Artículo no encontrado',
            });
        }

        return res.status(200).json({
            status: 'success',
            mensaje: 'Artículo eliminado exitosamente',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            mensaje: 'Error al eliminar el artículo',
            error: error.message,
        });
    }
};

const actualizarArticulo = async (req, res) => {
    try {
        const id = req.params.id;
        const nuevosDatos = req.body;

        const erroresValidacion = validaciones.validarTituloContenido(nuevosDatos.titulo, nuevosDatos.contenido);

        if (erroresValidacion.length > 0) {
            throw new Error(erroresValidacion.join(", "));
        }

        const resultado = await Articulo.findByIdAndUpdate(id, nuevosDatos, { new: true }).exec();

        if (!resultado) {
            return res.status(404).json({
                status: "error",
                mensaje: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: resultado,
            mensaje: "Artículo actualizado exitosamente"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        });
    }
};

module.exports = {
    prueba,
    crear,
    listar,
    consultarArticulo,
    eliminarArticulo,
    actualizarArticulo,
};
