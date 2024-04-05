const mongoose = require('mongoose');

// Define schema for shortcut document
const shortcutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shortcut: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Create model based on schema
const Shortcut = mongoose.model('Shortcut', shortcutSchema);

module.exports = Shortcut;
