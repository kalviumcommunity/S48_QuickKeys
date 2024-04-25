const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const QuickKey = require('./models/Shortcutschema');

// Create an Express app

const app = express();
const port = process.env.PORT || 3000; // Use the port from environment variable or default to 3000

app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = process.env.MONGODB_URI; // Use the environment variable for MongoDB URI

// Connect to MongoDB Atlas
mongoose.connect(uri, {});
console.log("Connected to MongoDB Atlas");

// Define the schema for the shortcut entity
const shortcutSchema = new mongoose.Schema({
    name: String,
    description: String,
    shortcut: String
});

// Create a model based on the schema

// Home route
app.get('/', (req, res) => {
    // Check database connection status
    const status = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.send(`Database connection status: ${status}`);
});

// Endpoint to fetch dummy data
app.get('/dummy-data', (req, res) => {
    QuickKey.find().then(keys=>res.json(keys))
    .catch(err=> res.json(err))
});

// POST endpoint to add a new shortcut entity
app.post('/shortcuts', async (req, res) => {
    try {
        // Extract data from request body
        const { name,  shortcut , description} = req.body;

        // Create a new shortcut instance
        const newShortcut = new QuickKey({ name, description, shortcut });

        // Save the new shortcut to the database
        await newShortcut.save();

        res.status(201).json({ message: 'Shortcut added successfully', shortcut: newShortcut });
    } catch (error) {
        console.error('Error adding shortcut:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

    // Connect to MongoDB Atlas when the server starts
});
