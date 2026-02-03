const University = require('../models/University');

exports.getUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.json(universities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUniversity = async (req, res) => {
    const { name, city, logo } = req.body;
    try {
        const university = await University.create({ name, city, logo });
        res.status(201).json(university);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUniversityById = async (req, res) => {
    try {
        const university = await University.findById(req.params.id);
        if (university) res.json(university);
        else res.status(404).json({ message: 'University not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
