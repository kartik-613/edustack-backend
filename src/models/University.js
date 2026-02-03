const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String },
    logo: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('University', universitySchema);
