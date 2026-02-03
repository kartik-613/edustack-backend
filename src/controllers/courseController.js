const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
    const universityId = req.query.universityId;
    try {
        const query = universityId ? { universityId } : {};
        const courses = await Course.find(query);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
