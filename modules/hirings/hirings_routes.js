const express = require('express');
const controller = require('./hiring.controller');
const { verifyToken, requireRole } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/', controller.getAllOpenHirings);
router.post('/', verifyToken, requireRole('club'), controller.createHiring);
router.patch('/:id', verifyToken, requireRole('club'), controller.updateHiring);
router.delete('/:id', verifyToken, requireRole('club'), controller.deleteHiring);

module.exports = router;
