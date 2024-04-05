require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000; // Use the port from environment variable or default to 3000

app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = process.env.MONGODB_URI; // Use the environment variable for MongoDB URI

// Connect to MongoDB Atlas
mongoose.connect(uri, {});
console.log("Connected to MongoDB Atlas");

// Home route
app.get('/', (req, res) => {
    // Check database connection status
    const status = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.send(`Database connection status: ${status}`);
});

// Endpoint to fetch dummy data
app.get('/dummy-data', (req, res) => {
    try {
        // Read the contents of shorty.json file
        const data = fs.readFileSync('shorty.json', 'utf8');
        const jsonData = JSON.parse(data);
        res.json(jsonData); // Send the JSON data as response
    } catch (err) {
        console.error('Error reading shorty.json:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

    // Connect to MongoDB Atlas when the server starts
});
