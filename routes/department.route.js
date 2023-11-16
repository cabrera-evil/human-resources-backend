var express = require('express');
var router = express.Router();
const { check } = require("express-validator");
const validateRequest = require("../middlewares/validateRequest.middleware");
const { createDepartment, getDepartments, updateDepartment, deleteDepartment } = require("../controllers/department.controller");

router.post(
    '/',
    [
        // TODO: Add validation for JWT
        check("name", "Name is required").not().isEmpty(),
        validateRequest,
    ],
    createDepartment
);

router.get(
    '/',
    [
        // TODO: Add validation for JWT
        validateRequest,
    ]
    , getDepartments
);

router.put(
    '/:id',
    [
        // TODO: Add validation for JWT
        check("id", "Id is required").not().isEmpty().isMongoId(),
        check("name", "Name is required").not().isEmpty().isString(),
        validateRequest,
    ],
    updateDepartment
);

router.delete(
    '/:id',
    [
        // TODO: Add validation for JWT
        check("id", "Id is required").not().isEmpty().isMongoId(),
        validateRequest,
    ],
    deleteDepartment
);

module.exports = router;
