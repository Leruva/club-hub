const express = require('express');
const controller = require('./admin_controller');
const { verifyToken, requireRole } = require('../../middleware/auth_middleware');

const router = express.Router();

// CLUBS
router.get('/clubs/pending', verifyToken, requireRole('superAdmin'), controller.getPendingClubs);
router.patch('/clubs/:id/approve', verifyToken, requireRole('superAdmin'), controller.approveClub);
router.patch('/clubs/:id/reject', verifyToken, requireRole('superAdmin'), controller.rejectClub);

// EVENTS
router.get('/events/pending', verifyToken, requireRole('superAdmin'), controller.getPendingEvents);
router.patch('/events/:id/approve', verifyToken, requireRole('superAdmin'), controller.approveEvent);
router.patch('/events/:id/reject', verifyToken, requireRole('superAdmin'), controller.rejectEvent);

module.exports = router;