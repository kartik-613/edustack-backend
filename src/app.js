const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const universityRoutes = require('./routes/universityRoutes');
const courseRoutes = require('./routes/courseRoutes');
const branchRoutes = require('./routes/branchRoutes');
const semesterRoutes = require('./routes/semesterRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const contentRoutes = require('./routes/contentRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/content', contentRoutes);


// Base Route
app.get('/', (req, res) => {
    res.send('EduStack API is running...');
});

module.exports = app;

