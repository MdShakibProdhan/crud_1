const mysql = require("mysql2")


// const connection = mysql.createConnection({
//     host: "localhost",
//     database: "product_a",
//     user: "root",
//     password: "password#404"
// });

const connection = mysql.createConnection({
    host: "localhost",
    database: "product_a",
    user: "root",
    password: "password#404"
});


module.exports = connection;