const mysql = require("mysql2")


const connection = mysql.createConnection({
    host: "localhost",
    database: "product_a",
    user: "root",
    password: process.env.PASSWORD
});

module.exports = connection;