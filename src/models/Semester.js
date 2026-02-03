const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    name: { type: String, required: true }, // e.g., "Semester 1"
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Semester', semesterSchema);
