const express = require('express');
const controller = require('./event_controller');
const { verifyToken, requireRole } = require('../../middleware/auth_middleware');
const { checkEventOwnership } = require('../../middleware/event_middleware');
const router = express.Router();

router.get('/', controller.getAllEvents);
router.get('/:id', controller.getSingleEvent);
router.post('/', verifyToken, requireRole('president','vicePresident','coordinator'), controller.createEvent);
router.post('/:id/register', verifyToken, requireRole('student'), controller.registerForEvent);
router.get('/:id/registrations', verifyToken, requireRole('president','vicePresident','coordinator'), checkEventOwnership, controller.getRegistrations);
router.patch('/:id', verifyToken, requireRole('president','vicePresident'), checkEventOwnership, controller.updateEvent);
router.delete('/:id', verifyToken, requireRole('president','vicePresident'), checkEventOwnership, controller.deleteEvent);

module.exports = router;