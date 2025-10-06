const express = require("express");
const api = new express();

// middleware para formatear json
api.use(express.json());
// http://localhost:3000/hola
// http://localhost:3000?token=2344321224...
api.get("/:saludo", (req, res) => {
    const precio = req.query.saludo
    res.json({
        "message": "Hello World!"
    });
});

api.post("/", (req, res) => {
    const dato = req.body.dato;
    // validacion
    if (!dato) {
        return res.status(400).json({
            "error": "Hello Dato " + dato
        });
    }
    return res.json({
        "message": "Hello Dato " + dato
    });
});

api.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
})

