var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const validateRequest = require("../middlewares/validateRequest.middleware");
const { createDepartment, getDepartments, updateDepartment, deleteDepartment } = require("../controllers/department.controller");
const authenticateToken = require("../middlewares/authenticateToken.middleware");
const validateRole = require("../middlewares/validateRole.middleware");

router.post(
    '/',
    [
        authenticateToken,
        validateRole(["SuperAdmin", "Admin"]),
        check("name", "Name is required").not().isEmpty(),
        validateRequest,
    ],
    createDepartment
);

router.get(
    '/',
    [
        authenticateToken,
        validateRole(["SuperAdmin", "Admin"]),
        validateRequest,
    ]
    , getDepartments
);

router.patch(
    '/:id',
    [
        authenticateToken,
        validateRole(["SuperAdmin", "Admin"]),
        check("id", "Id is required").not().isEmpty().isMongoId(),
        check("name", "Name is required").optional().isString(),
        validateRequest,
    ],
    updateDepartment
);

router.delete(
    '/:id',
    [
        authenticateToken,
        validateRole(["SuperAdmin", "Admin"]),
        check("id", "Id is required").not().isEmpty().isMongoId(),
        validateRequest,
    ],
    deleteDepartment
);

module.exports = router;
