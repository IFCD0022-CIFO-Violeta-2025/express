const express = require("express");
const server = new express();

const routes = require("./routes");

server.use(express.json());
server.use("/api/v1", routes);

server.use((req, res) => {
    res.status(400).json({
        error: "Error 404 / Ruta no encontrada"
    })
});

server.listen(4000, () => {
    console.log("Servidor escuchando en el puerto 4000");
});