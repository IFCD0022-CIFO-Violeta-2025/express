const express = require("express");
const config = require("./config/config");
const todoRoutes = require("./routes/todo.routes");
const { notFound } = require("./middlewares/error.middleware");

const api = express();
// middleware config  
api.use(express.json());
api.use("/api/v1", todoRoutes);
api.use(notFound);

api.listen(config.port, () => {
    console.log(`===========================================`)
    console.log(`Servidor corriendo en puerto ${config.api_port}`)
    console.log(`URL http://localhost:${config.api_port}`)
    console.log(`===========================================`)
});