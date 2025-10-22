const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'todos',
    port: 3306
});

async function testConnectionMySQL() {
    try {
        await connection.getConnection();
        console.log("Conexion a MySQL correcta!");
    } catch (error) {
        console.log(error);
    }
}

testConnectionMySQL();

module.exports = connection;