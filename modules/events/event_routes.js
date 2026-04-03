const express = require('express');
const controller = require('./event_controller');
const { verifyToken, requireRole } = require('../../middleware/auth_middleware');

const router = express.Router();

router.get('/', controller.getAllEvents);
router.post('/', verifyToken, requireRole('club'), controller.createEvent);
router.post('/:id/register', verifyToken, requireRole('student'), controller.registerForEvent);
router.get('/:id/registrations', verifyToken, requireRole('club'), controller.getRegistrations);

module.exports = router;