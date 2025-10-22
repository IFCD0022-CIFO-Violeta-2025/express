const express = require("express");
const Router = express.Router();

const connection = require("./mysql_conn");

// LEER
Router.get("/getDato", async (req, res) => {
    try {
        const [results] = await connection.query("select * from crud");
        if (results.length === 0) {
            return res.json({ mensaje: "No hay datos en MySQL" });
        }
        res.json({ dato: results });
    } catch (error) {
        res.status(500).json({error});
    }
});

// CREAR
Router.post("/setDato", async (req, res) => {
    try {
        const dato = req.body.dato;
        await connection.query(`insert into crud (dato) values ("${dato}")`);
        res.status(201).json({ mensaje: dato + " insertado ok!"});
    } catch (error) {
        res.status(500).json({ error });
    }
});

// ACTUALIZAR
Router.put("/updateDato/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const dato = req.body.dato;
        connection.query(`update crud set dato = "${dato}" where id = ${id}`);
        res.status(200).json({ mensaje: dato + " actualizado ok!" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// BORRAR
Router.delete("/deleteDato/:id", async (req, res) => {
    try {
        const id = req.params.id;
        connection.query(`delete from crud where id = ${id}`);
        res.status(200).json({ mensaje: "dato con id " + id + " borrado ok!" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = Router;