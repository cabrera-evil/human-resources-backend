var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const validateRequest = require("../middlewares/validateRequest.middleware");
const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/user.controller");
const authenticateToken = require("../middlewares/authenticateToken.middleware");
const validateRole = require('../middlewares/validateRole.middleware');

router.post(
    '/',
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
    createUser
);

router.get(
    '/',
    [
        authenticateToken,
        validateRole(["SuperAdmin", "Admin"]),
        validateRequest,
    ]
    , getUsers
);

router.patch(
    '/:id',
    [
        authenticateToken,
        validateRole(["SuperAdmin", "Admin", "Employee"]),
        check("id", "Id is required").not().isEmpty().isMongoId(),
        check("name", "Name is required").optional().isString(),
        check("email", "Email is required").optional().isEmail(),
        check("password", "Password is required").optional().isStrongPassword(),
        check("role", "Role is required").optional().isMongoId(),
        check("department", "Department is required").optional().isMongoId(),
        validateRequest,
    ],
    updateUser
);

router.delete(
    '/:id',
    [
        authenticateToken,
        validateRole(["SuperAdmin", "Admin"]),
        check("id", "Id is required").not().isEmpty().isMongoId(),
        validateRequest,
    ],
    deleteUser
);

module.exports = router;
