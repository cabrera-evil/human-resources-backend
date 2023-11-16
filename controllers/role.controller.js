const roleService = require('../services/role.service');

// Create and Save a new Role
const createRole = async (req, res) => {
    try {
        const { body } = req;

        const newRole = await roleService.createRole(body);
        res.status(200).json({ message: 'ROLE_CREATED', data: newRole });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve and return all roles from the database.
const getRoles = async (req, res) => {
    try {
        const roles = await roleService.getRoles();
        res.status(200).json({ message: 'ROLES_FETCHED', data: roles });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a role description identified by the roleId in the request
const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const updatedRole = await roleService.updateRole(id, body);
        res.status(200).json({ message: 'ROLE_UPDATED', data: updatedRole });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a role with the specified roleId in the request
const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRole = await roleService.deleteRole(id);
        res.status(200).json({ message: 'ROLE_DELETED', data: deletedRole });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createRole,
    getRoles,
    updateRole,
    deleteRole
};