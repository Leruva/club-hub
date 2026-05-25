const express = require('express');
const controller = require('./auth_controller');

const router = express.Router();

router.post('/student/register', controller.studentRegister);
router.post('/student/login', controller.studentLogin);
router.post('/club/register', controller.clubRegister);
router.post('/club/login', controller.clubLogin);

module.exports = router;

