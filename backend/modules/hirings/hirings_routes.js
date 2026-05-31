const express = require('express');
const controller = require('./hirings_controller');
const { verifyToken, requireRole } = require('../../middleware/auth_middleware');

const router = express.Router();

router.get('/', controller.getAllOpenHirings);
router.post('/', verifyToken, requireRole('president'), controller.createHiring);
router.patch('/:id', verifyToken, requireRole('president'), controller.updateHiring);
router.delete('/:id', verifyToken, requireRole('president'), controller.deleteHiring);

module.exports = router;
