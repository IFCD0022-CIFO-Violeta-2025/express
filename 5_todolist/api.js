const express = require("express");
const config = require("./config/config");
const todoRoutes = require("./routes/todo.routes");
const { notFound } = require("./middlewares/error.middleware");
const { userInfo } = require("./middlewares/serverInfo");

const api = express();
// middleware config
api.use(express.json());
api.use(userInfo);
api.use("/api/v1", todoRoutes);
api.use(notFound);


api.listen(config.port, () => {
    console.log(`===========================================`)
    console.log(`Servidor corriendo en puerto ${config.port}`)
    console.log(`URL http://localhost:${config.port}`)
    console.log(`===========================================`)
});