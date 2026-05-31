const express = require('express');
const controller = require('./announcements_controller');
const { verifyToken, requireRole} = require('../../middleware/auth_middleware');
const { requireAnnouncementOwnership } = require('../../middleware/event_middleware');

const router = express.Router();

router.get('/', controller.getAllAnnouncements);
router.get('/:id',controller.getAnnouncement);
router.post('/', verifyToken, requireRole('president','vicePresident','coordinator'), controller.createAnnouncement);
router.patch('/:id', verifyToken, requireRole('president','vicePresident','coordinator'), requireAnnouncementOwnership, controller.updateAnnouncement);
router.delete('/:id', verifyToken, requireRole('president','vicePresident'), requireAnnouncementOwnership, controller.deleteAnnouncement);

module.exports = router;