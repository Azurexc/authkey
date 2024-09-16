require('dotenv').config(); // Load the .env file

const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

// Your app logic here...

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
