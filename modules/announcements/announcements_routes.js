const express = require('express');
const controller = require('./announcements_controller');
const { verifyToken, requireRole} = require('../../middleware/auth_middleware');
const { requireAnnouncementOwnership } = require('../../middleware/event_middleware');

const router = express.Router();

router.get('/', controller.getAllAnnouncements);
router.post('/', verifyToken, requireRole('club'), controller.createAnnouncement);
router.patch('/:id', verifyToken, requireRole('club'), requireAnnouncementOwnership, controller.updateAnnouncement);
router.delete('/:id', verifyToken, requireRole('club'), requireAnnouncementOwnership, controller.deleteAnnouncement);

module.exports = router;