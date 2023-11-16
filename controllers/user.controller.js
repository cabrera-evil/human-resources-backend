const userService = require('../services/user.service');

// Create and Save a new User
const createUser = async (req, res) => {
    try {
        const { body } = req;

        const newUser = await userService.createUser(body);
        res.status(200).json({ message: 'USER_CREATED', data: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve and return all users from the database.
const getUsers = async (req, res) => {
    try {
        const user = await userService.getUsers();
        res.status(200).json({ message: 'USERS_FETCHED', data: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user description identified by the userId in the request
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const updatedUser = await userService.updateUser(id, body);
        res.status(200).json({ message: 'USER_UPDATED', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user with the specified userId in the request
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await userService.deleteUser(id);
        res.status(200).json({ message: 'USER_DELETED', data: deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createUser: createUser,
    getUsers,
    updateUser,
    deleteUser
};