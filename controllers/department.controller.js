const departmentService = require('../services/department.service');

// Create and Save a new Department
const createDepartment = async (req, res) => {
    try {
        const { body } = req;

        const newDepartment = await departmentService.createDepartment(body);
        res.status(200).json({ message: 'DEPARTMENT_CREATED', data: newDepartment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve and return all departments from the database.
const getDepartments = async (req, res) => {
    try {
        const departments = await departmentService.getDepartments();
        res.status(200).json({ message: 'DEPARTMENTS_FETCHED', data: departments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a department description identified by the departmentId in the request
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const updatedDepartment = await departmentService.updateDepartment(id, body);
        res.status(200).json({ message: 'DEPARTMENT_UPDATED', data: updatedDepartment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a department with the specified departmentId in the request
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDepartment = await departmentService.deleteDepartment(id);
        res.status(200).json({ message: 'DEPARTMENT_DELETED', data: deletedDepartment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
};