const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_USE,
});

con.connect((err) => {
    if (err) {
        console.log("DB Connect Fail!");
        con.end();
    } else {
        console.log("DB Connect Success!");
    }
});

module.exports = con;
