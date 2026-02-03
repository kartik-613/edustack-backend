const express = require('express');
const router = express.Router();
const {
    getContent,
    uploadContent,
    approveContent,
    getTeacherContent,
    getAdminContent
} = require('../controllers/contentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/', getContent);
router.post('/upload', protect, authorize('teacher', 'admin'), uploadContent);
router.put('/:id/approve', protect, authorize('admin'), approveContent);

// Teacher specific routes
router.get('/teacher', protect, authorize('teacher'), getTeacherContent);

// Admin specific routes
router.get('/admin', protect, authorize('admin'), getAdminContent);

module.exports = router;
