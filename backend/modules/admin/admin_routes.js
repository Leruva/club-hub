const express = require('express');
const controller = require('./admin_controller');
const {verifyToken, requireRole} = require('../../middleware/auth_middleware');
const router = express.Router();   

router.use(verifyToken, requireRole('admin'));
router.get('/clubs/pending', controller.pendingClubRequest);
router.get('/clubs', controller.getAllClubs);
router.patch('/clubs/:id/approve', controller.approveClubRequest);
router.patch('/clubs/:id/reject', controller.rejectClubRequest);

module.exports = router;