var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const validateRequest = require("../middlewares/validateRequest.middleware");
const { createRole, getRoles, updateRole, deleteRole } = require("../controllers/role.controller");

router.post(
    '/',
    [
        // TODO: Add validation for JWT
        check("name", "Name is required").not().isEmpty(),
        validateRequest,
    ],
    createRole
);

router.get(
    '/',
    [
        // TODO: Add validation for JWT
        validateRequest,
    ]
    , getRoles
);

router.put(
    '/:id',
    [
        // TODO: Add validation for JWT
        check("id", "Id is required").not().isEmpty().isMongoId(),
        check("name", "Name is required").not().isEmpty(),
        validateRequest,
    ],
    updateRole
);

router.delete(
    '/:id',
    [
        // TODO: Add validation for JWT
        check("id", "Id is required").not().isEmpty().isMongoId(),
        validateRequest,
    ],
    deleteRole
);

module.exports = router;
