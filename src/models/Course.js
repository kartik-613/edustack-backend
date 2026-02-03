const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    name: { type: String, required: true },
    duration: { type: String }, // e.g. "4 Years"
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
