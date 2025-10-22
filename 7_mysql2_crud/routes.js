const express = require("express");
const Router = express.Router();

const connection = require("./mysql_conn");

Router.get("/getDato", async (req, res) => {
    try {
        const [results] = await connection.query("select * from crud");
        res.json({
            dato: results
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});

Router.post("/setDato", async (req, res) => {
    try {
        const dato = req.body.dato;
        await connection.query(`insert into crud (dato) values ("${dato}")`);
        res.status(201).json({ mensaje: dato + " insertado ok!"});
    } catch (error) {
        res.status(500).json({ error });
    }
});


module.exports = Router;