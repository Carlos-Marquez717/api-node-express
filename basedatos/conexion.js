const mongoose = require("mongoose");

const conexion = async() => {

    try { 
       await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog")

       console.log("conectado correctamente")

    } catch(error){
        console.log(error);
        throw new Error ("No se ha podido conectar a la base de datos");
    }
    


}

module.exports = {
    conexion
}