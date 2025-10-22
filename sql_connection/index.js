const express = require("express");
const mysql = require("mysql2/promise");
const app = new express();

async function testConnectionMySql() {
    try {
        await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'test'
        })
        console.log("connection a mysql correcta");
    } catch (error) {
        console.log(error)
    }
}
testConnectionMySql()

app.listen(4000, () => 
    console.log("Servidor escuchando en el puerto 4000"
))

app.get("/", (req, res) => {
    res.json({
        "message": "Hello World!"
    });
});