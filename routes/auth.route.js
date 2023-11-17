var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const { createLogin, getProfile } = require('../controllers/auth.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const validateRequest = require("../middlewares/validateRequest.middleware");

router.post(
    '/login',
    [
        check("email", "Please enter a valid email").not().isEmpty().isEmail(),
        check("password", "Please enter a valid password").not().isEmpty().isStrongPassword(),
        validateRequest,
    ],
    createLogin
);

router.post('/profile', authenticateToken, getProfile);

module.exports = router;
