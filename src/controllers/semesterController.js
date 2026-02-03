const Semester = require('../models/Semester');

exports.getSemesters = async (req, res) => {
    const { universityId, courseId, branchId } = req.query;
    try {
        let query = {};
        if (universityId) query.universityId = universityId;
        if (courseId) query.courseId = courseId;
        if (branchId) query.branchId = branchId;

        const semesters = await Semester.find(query);
        res.json(semesters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSemester = async (req, res) => {
    try {
        const semester = await Semester.create(req.body);
        res.status(201).json(semester);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
