const mysql = require("mysql2/promise");
const config = require("../config/config");

const connection = mysql.createPool({
    host: config.db_host,
    user: config.db_user,
    database: config.db_database,
    port: config.db_port
});

async function testConnectionMySQL() {
    try {
        await connection.getConnection();
        console.log("Conexion a MySQL correcta!");
    } catch (error) {
        console.log(error); // error mysql server
    }
}

testConnectionMySQL();

module.exports = connection;