const {conexion} = require("./basedatos/conexion");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


console.log("App de node Arrancada");

// conectar a la base de datos
conexion();


// crear servidor node

const app = express();
const puerto =3900;

app.use("/imagen/articulos", express.static(path.join(__dirname, "imagen/articulos")));

// configurar cors
app.use(cors());



// convertir body a objeto js
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// crear rutas
const rutas_articulo = require("./rutas/articulo");

//cargo las rutas
app.use("/api", rutas_articulo);






app.get("/probando", (req, res) => {
    console.log("Se Ha Ejecutado el Endpoint probando");

    return res.status(200).send();

});

// crear servidor y escuchar peticiones http
app.listen(puerto, () =>{ 
    console.log("Servidor corriendo en el puerto"+puerto);
});


