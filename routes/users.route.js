var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const validateRequest = require("../middlewares/validateRequest.middleware");
const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/user.controller");

router.post(
    '/',
    [
        // TODO: Add validation for JWT
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").not().isEmpty(),
        check("password", "Password is required").not().isEmpty(),
        validateRequest,
    ],
    createUser
);

router.get(
    '/',
    [
        // TODO: Add validation for JWT
        validateRequest,
    ]
    , getUsers
);

router.put(
    '/:id',
    [
        // TODO: Add validation for JWT
        check("id", "Id is required").not().isEmpty().isMongoId(),
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").not().isEmpty(),
        check("password", "Password is required").not().isEmpty(),
        validateRequest,
    ],
    updateUser
);

router.delete(
    '/:id',
    [
        // TODO: Add validation for JWT
        check("id", "Id is required").not().isEmpty().isMongoId(),
        validateRequest,
    ],
    deleteUser
);

module.exports = router;
