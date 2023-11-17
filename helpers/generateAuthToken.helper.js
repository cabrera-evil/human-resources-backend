const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAuthToken = async (user) => {
    try {
        const payload = {
            _id: user._id,
            email: user.email,
            role: user.role, // Assuming the user object has a 'role' property
        };

        const options = {
            expiresIn: process.env.JWT_EXPIRATION || '1h',
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, options);

        return token;
    } catch (error) {
        throw error;
    }
};

module.exports = generateAuthToken;
