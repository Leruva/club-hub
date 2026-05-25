const express = require('express');
const controller = require('./student_controller');
const { verifyToken, requireRole } = require('../../middleware/auth_middleware');

const router = express.Router();

router.get('/feed', verifyToken, requireRole('student'), controller.getStudentFeed);

module.exports = router;