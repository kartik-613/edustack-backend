const Branch = require('../models/Branch');

exports.getBranches = async (req, res) => {
    const { universityId, courseId } = req.query;
    try {
        let query = {};
        if (universityId) query.universityId = universityId;
        if (courseId) query.courseId = courseId;

        const branches = await Branch.find(query);
        res.json(branches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBranch = async (req, res) => {
    try {
        const branch = await Branch.create(req.body);
        res.status(201).json(branch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
