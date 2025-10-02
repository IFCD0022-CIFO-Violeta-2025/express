const express = require("express");
const api = new express();

// middleware para formatear json
api.use(express.json());

api.get("/", (req, res) => {
    res.json({
        "message": "Hello World!"
    });
});

api.post("/", (req, res) => {
    const dato = req.body.dato;
    res.json({
        "message": "Hello Dato " + dato
    });
});

api.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
})

