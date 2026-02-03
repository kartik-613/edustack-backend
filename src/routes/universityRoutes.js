const express = require('express');
const router = express.Router();
const { getUniversities, createUniversity, getUniversityById } = require('../controllers/universityController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/', getUniversities);
router.get('/:id', getUniversityById);
router.post('/', protect, authorize('admin'), createUniversity);

module.exports = router;
