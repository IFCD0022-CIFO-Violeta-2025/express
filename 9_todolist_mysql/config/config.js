require('dotenv').config();

const config = {
    api_port: process.env.API_PORT,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_database: process.env.DB_DATABASE,
    db_port: process.env.DB_PORT
}

module.exports = config;