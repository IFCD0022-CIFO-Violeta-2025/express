const express = require("express");
const mysql = require("mysql2/promise");
const app = new express();

app.use(express.json());

let connection;

async function testConnectionMySQL() {
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'test'
        });
        console.log("Conexion a MySQL correcta!");
    } catch (error) {
        console.log(error);
    }
}

testConnectionMySQL();

// INSERT o QUERY CON PROTECCION DE INYECCION DE CODIGO SQL (seguridad)
app.post("/setDato", async (req, res) => {
    try {
        const dato = req.body.dato;
        await connection.query(`insert into crud (dato) values (?)`, [dato]);
        res.status(201).json({ mensaje: dato + " insertado ok!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

app.listen(4000, () => {
    console.log("Servidor escuchando en el puerto 4000");
});