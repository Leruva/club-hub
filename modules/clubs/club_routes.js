const express = require('express');
const controller = require('./club_controller');
const { verifyToken, requireRole } = require('../../middleware/auth_middleware');

const router = express.Router();

router.get('/me/insights', verifyToken, requireRole('club'), controller.getMyInsights);

module.exports = router;