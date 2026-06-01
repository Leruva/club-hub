const express = require('express');
const controller = require('./auth_controller');
const {verifyToken} = require('../../middleware/auth_middleware');
const router = express.Router();

router.post('/student/register', controller.studentRegister);
router.post('/student/login', controller.studentLogin);
router.post('/club/register', verifyToken, controller.clubRegister);
router.post('/club/login', controller.clubLogin);

router.post('/forgot-password', controller.forgotPasswordController);
router.patch('/reset-password/:token', controller.resetPasswordController);

module.exports = router;

