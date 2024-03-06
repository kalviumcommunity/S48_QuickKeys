require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { MongoClient } = require('mongodb');
const  mongoose  = require('mongoose');

const app = express();
const port = 3000;

// MongoDB connection URI
const uri = process.env.MONGODB_URI; // Use the environment variable for MongoDB URI

// Connect to MongoDB Atlas
mongoose.connect(uri,{}); 
console.log("Connected to MongoDB Atlas");


// Home route
app.get('/',  (req, res) => {
    // Check database connection status
    const status = mongoose.connection.readyState===1 ? 'Connected' : 'Disconnected';
    res.send(`Database connection status: ${status}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
    // Connect to MongoDB Atlas when the server starts

});
