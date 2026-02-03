const express = require('express');
const router = express.Router();
const { getSemesters, createSemester } = require('../controllers/semesterController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/', getSemesters);
router.post('/', protect, authorize('admin'), createSemester);

module.exports = router;
