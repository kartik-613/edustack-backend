const express = require('express');
const router = express.Router();
const { getSubjects, createSubject } = require('../controllers/subjectController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/', getSubjects);
router.post('/', protect, authorize('admin'), createSubject);

module.exports = router;
