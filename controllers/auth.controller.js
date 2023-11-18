const authService = require('../services/auth.service');

// Register a new user
const register = async (req, res) => {
    try {
        const { body } = req;

        const newUser = await authService.register(body);
        res.status(200).json({ message: 'USER_CREATED', data: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create login authentication
const createLogin = async (req, res) => {
    try {
        const { body } = req;

        const authentication = await authService.createLogin(body);
        res.status(200).json({ message: 'USER_LOGGED', data: authentication });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrive user profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const profile = await authService.getProfile(userId);
        res.status(200).json({ message: 'USER_PROFILE_FOUND', data: profile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createLogin,
    getProfile,
    register
};