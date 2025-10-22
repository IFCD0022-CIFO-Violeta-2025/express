const express = require("express");
const server = new express();

const roots = require("./routes")

server.use(express.json())
server.use("/api", routes)
server.use((req, res) => {
    res.status(400).json({
        error: "Error 404"
    })
})

server.listen(4000, () => 
    console.log("Servidor escuchando en el puerto 4000"
))