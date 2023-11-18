var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const { createLogin, getProfile, register } = require('../controllers/auth.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');
const validateRequest = require("../middlewares/validateRequest.middleware");
const validateRole = require('../middlewares/validateRole.middleware');

router.post(
    '/register',
    [
        authenticateToken,
        validateRole(["SuperAdmin", "Admin"]),
        check("name", "Name is required").not().isEmpty().isString(),
        check("email", "Email is required").not().isEmpty().isEmail(),
        check("role", "Role is required").not().isEmpty().isMongoId(),
        check("department", "Department is required").not().isEmpty().isMongoId(),
        check("password", "Password is required").not().isEmpty().isStrongPassword(),
        validateRequest,
    ],
    register
);

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
