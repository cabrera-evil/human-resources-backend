const { getClient } = require("../config/database.config");
const { ObjectId } = require('mongodb');

const createRole = async (role) => {
    try {
        const db = await getClient();
        const collection = db.collection('roles');

        // Validate if the role already exists
        const existingRole = await collection.findOne({ name: role.name });
        if (existingRole) {
            throw new Error('ROLE_ALREADY_EXISTS');
        }

        const newRole = await collection.insertOne(role);

        return newRole;
    } catch (error) {
        throw error;
    }
};

const getRoles = async () => {
    try {
        const db = await getClient();
        const collection = db.collection('roles');

        // Get all roles
        const roles = await collection.find({}).toArray();
        if (!roles) {
            throw new Error('ROLES_NOT_FOUND');
        }

        return roles;
    } catch (error) {
        throw error;
    }
}

const updateRole = async (id, role) => {
    try {
        const db = await getClient();
        const collection = db.collection('roles');

        // Convert string id to ObjectId
        const objectId = new ObjectId(id);

        // Validate if the roles already exists
        const existingRole = await collection.findOne({ name: role.name });
        if (existingRole) {
            throw new Error('ROLE_ALREADY_EXISTS');
        }

        // Check if the role exists before updating
        const updatedRole = await collection.findOneAndUpdate(
            { _id: objectId },
            { $set: role },
            { returnDocument: 'after' }
        );
        if (!updatedRole) {
            throw new Error('ROLE_NOT_FOUND');
        }

        return updatedRole;
    } catch (error) {
        throw error;
    }
};

const deleteRole = async (id) => {
    try {
        const db = await getClient();
        const collection = db.collection('roles');

        // Convert string id to ObjectId
        const objectId = new ObjectId(id);

        // Check if the role exists before deleting
        const deletedRole = await collection.findOneAndDelete({ _id: objectId });
        if (!deletedRole) {
            throw new Error('ROLE_NOT_FOUND');
        }

        return deletedRole;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createRole,
    getRoles,
    updateRole,
    deleteRole
};
