const { getClient } = require("../config/database.config");
const verifyPassword = require("../helpers/verifyPassword.helper");
const generateAuthToken = require("../helpers/generateAuthToken.helper");

const createLogin = async (user) => {
    try {
        const db = await getClient();
        const collection = db.collection('users');

        // Validate if the user already exists
        const existingUser = await collection.findOne({ email: user.email });
        if (!existingUser) {
            throw new Error('USER_NOT_FOUND');
        }

        // Validate if the password is correct
        const isValidPassword = await verifyPassword(user.password, existingUser.password);

        if (!isValidPassword) {
            throw new Error('INVALID_PASSWORD');
        }

        const token = await generateAuthToken(existingUser);

        return {
            user: existingUser,
            token,
        }
    } catch (error) {
        throw error;
    }
};

const getProfile = async (userId) => {
    try {
        const db = await getClient();
        const collection = db.collection('users');

        // Validate if the user already exists
        const existingUser = await collection.findOne({ _id: userId });
        if (!existingUser) {
            throw new Error('USER_NOT_FOUND');
        }

        return existingUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createLogin,
    getProfile,
};
