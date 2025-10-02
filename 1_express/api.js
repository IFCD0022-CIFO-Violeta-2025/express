const express = require("express");
const api = new express();

api.get("/", (req, res) => {
    res.send("Hello World!");
});

api.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
})

