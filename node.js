app.post('/validate-key', (req, res) => {
    const { key } = req.body;
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    const query = 'SELECT * FROM keys WHERE `key` = ?';
    connection.query(query, [key], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ valid: false, message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ valid: false, message: 'Invalid key' });
        }

        const keyData = results[0];
        if (currentTime > keyData.expirationTime) {
            return res.status(400).json({ valid: false, message: 'Key expired' });
        }

        // If the key is valid and not expired
        res.json({ valid: true, message: 'Key is valid' });
    });
});
