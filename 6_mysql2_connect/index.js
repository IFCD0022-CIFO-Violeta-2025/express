const express = require("express");
const mysql = require("mysql2/promise");
const app = new express();

async function testConnectionMySQL() {
    try {
        await mysql.createConnection({
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

app.listen(4000, () => {
    console.log("Servidor escuchando en el puerto 4000");
});