const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    semesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true },
    name: { type: String, required: true },
    code: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subject', subjectSchema);
