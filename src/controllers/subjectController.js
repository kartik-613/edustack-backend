const Subject = require('../models/Subject');

exports.getSubjects = async (req, res) => {
    const { universityId, courseId, branchId, semesterId } = req.query;
    try {
        let query = {};
        if (universityId) query.universityId = universityId;
        if (courseId) query.courseId = courseId;
        if (branchId) query.branchId = branchId;
        if (semesterId) query.semesterId = semesterId;

        const subjects = await Subject.find(query);
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSubject = async (req, res) => {
    try {
        const subject = await Subject.create(req.body);
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
