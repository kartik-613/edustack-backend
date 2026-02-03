const express = require('express');
const router = express.Router();
const { getCourses, createCourse } = require('../controllers/courseController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/', getCourses);
router.post('/', protect, authorize('admin'), createCourse);

module.exports = router;
