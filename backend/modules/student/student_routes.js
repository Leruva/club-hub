const express = require('express');
const controller = require('./student_controller');
const { verifyToken, requireRole } = require('../../middleware/auth_middleware');

const router = express.Router();

router.get('/feed', verifyToken, requireRole('student'), controller.getStudentFeed);
router.get('/me', verifyToken, requireRole('student'), controller.getStudentProfile);
router.patch('/me', verifyToken, requireRole('student'), controller.updateStudentProfile);

module.exports = router;