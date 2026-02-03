const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    type: {
        type: String,
        enum: ['syllabus', 'pyqs', 'videos', 'practicals', 'answers', 'notes'],
        required: true
    },
    title: { type: String, required: true },
    fileUrl: { type: String }, // For PDF/Docs
    videoUrl: { type: String }, // For video lectures
    unit: { type: Number }, // Unit 1, 2, 3 etc.
    isPremium: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', contentSchema);
