const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const Joi = require('joi');
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

const createEntity = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  shortcut: Joi.string().required()
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

        const value = await createEntity.validateAsync(req.body);

        const newShortcut = new QuickKey(value);

        // Create a new shortcut instance

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
app.get('/shortcuts/:id', async (req, res) => {
  try {
    const shortcut = await QuickKey.findById(req.params.id);
    res.json(shortcut);
  } catch (error) {
    console.error('Error fetching shortcut:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT endpoint to update an entity
app.put('/updateentity/:id', async (req, res) => {
  try {
    const updatedEntity = await QuickKey.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntity);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE endpoint to delete an entity
app.delete('/shortcuts/:id', async (req, res) => {
  try {
    await QuickKey.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entity deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});