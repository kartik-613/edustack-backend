const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Branch', branchSchema);
