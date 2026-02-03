const Content = require('../models/Content');

exports.getContent = async (req, res) => {
    const { subjectId, type } = req.query;
    try {
        let query = { approved: true };
        if (subjectId) query.subjectId = subjectId;
        if (type) query.type = type;

        const contents = await Content.find(query).sort({ unit: 1 });
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.uploadContent = async (req, res) => {
    try {
        const contentData = {
            ...req.body,
            uploadedBy: req.user.id,
            approved: req.user.role === 'admin'
        };
        const content = await Content.create(contentData);
        res.status(201).json(content);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.approveContent = async (req, res) => {
    try {
        const content = await Content.findByIdAndUpdate(
            req.params.id,
            { approved: true },
            { new: true }
        );
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTeacherContent = async (req, res) => {
    const { type } = req.query;
    try {
        let query = { uploadedBy: req.user.id };
        if (type) query.type = type;
        const contents = await Content.find(query);
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdminContent = async (req, res) => {
    try {
        const contents = await Content.find({ approved: false }).populate('subjectId');
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
