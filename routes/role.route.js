var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const validateRequest = require("../middlewares/validateRequest.middleware");
const { createRole, getRoles, updateRole, deleteRole } = require("../controllers/role.controller");
const authenticateToken = require("../middlewares/authenticateToken.middleware");
const validateRole = require("../middlewares/validateRole.middleware");

router.post(
    '/',
    [
        authenticateToken,
        validateRole(["SuperAdmin"]),
        check("name", "Name is required").not().isEmpty().isString(),
        validateRequest,
    ],
    createRole
);

router.get(
    '/',
    [
        authenticateToken,
        validateRole(["SuperAdmin"]),
        validateRequest,
    ]
    , getRoles
);

router.patch(
    '/:id',
    [
        authenticateToken,
        validateRole(["SuperAdmin"]),
        check("id", "Id is required").not().isEmpty().isMongoId(),
        check("name", "Name is required").optional().isString(),
        validateRequest,
    ],
    updateRole
);

router.delete(
    '/:id',
    [
        authenticateToken,
        validateRole(["SuperAdmin"]),
        check("id", "Id is required").not().isEmpty().isMongoId(),
        validateRequest,
    ],
    deleteRole
);

module.exports = router;
