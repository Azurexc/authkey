// Load environment variables from .env file
require('dotenv').config();

const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Set up MySQL connection using environment variables
const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to validate a key
app.post('/validate-key', (req, res) => {
    const { key } = req.body;
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    const query = 'SELECT * FROM keys WHERE `key` = ?';
    connection.query(query, [key], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ valid: false, message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ valid: false, message: 'Invalid key' });
        }

        const keyData = results[0];
        if (currentTime > keyData.expirationTime) {
            return res.status(400).json({ valid: false, message: 'Key expired' });
        }

        res.json({ valid: true, message: 'Key is valid' });
    });
});

// Route to add a new key (Optional: for admin use)
app.post('/add-key', (req, res) => {
    const { key, expirationTime } = req.body;
    const query = 'INSERT INTO keys (key, expirationTime) VALUES (?, ?)';
    connection.query(query, [key, expirationTime], (err, results) => {
        if (err) {
            console.error('Error adding key:', err);
            return res.status(500).json({ message: 'Error adding key' });
        }
        res.json({ message: 'Key added successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
