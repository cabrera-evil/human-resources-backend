const { getClient } = require("../config/database.config");
const { ObjectId } = require('mongodb');

const createUser = async (user) => {
    try {
        const db = await getClient();
        const collection = db.collection('users');

        // Validate if the user already exists
        const existingUser = await collection.findOne({ name: user.email });
        if (existingUser) {
            throw new Error('USER_ALREADY_EXISTS');
        }

        const newUser = await collection.insertOne(user);

        return newUser;
    } catch (error) {
        throw error;
    }
};

const getUsers = async () => {
    try {
        const db = await getClient();
        const collection = db.collection('users');

        // Get all users
        const users = await collection.find({}).toArray();
        if (!users) {
            throw new Error('USER_NOT_FOUND');
        }

        return users;
    } catch (error) {
        throw error;
    }
}

const updateUser = async (id, user) => {
    try {
        const db = await getClient();
        const collection = db.collection('users');

        // Convert string id to ObjectId
        const objectId = new ObjectId(id);

        // Validate if the user already exists
        const existingUser = await collection.findOne({ name: user.email });
        if (existingUser) {
            throw new Error('USER_ALREADY_EXISTS');
        }

        // Check if the user exists before updating
        const updatedUser = await collection.findOneAndUpdate(
            { _id: objectId },
            { $set: user },
            { returnDocument: 'after' }
        );
        if (!updatedUser) {
            throw new Error('USER_NOT_FOUND');
        }

        return updatedUser;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        const db = await getClient();
        const collection = db.collection('users');

        // Convert string id to ObjectId
        const objectId = new ObjectId(id);

        // Check if the user exists before deleting
        const deletedUser = await collection.findOneAndDelete({ _id: objectId });
        if (!deletedUser) {
            throw new Error('USER_NOT_FOUND');
        }

        return deletedUser;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
};
