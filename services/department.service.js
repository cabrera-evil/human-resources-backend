const { getClient } = require("../config/database.config");
const { ObjectId } = require('mongodb');

const createDepartment = async (department) => {
    try {
        const db = await getClient();
        const collection = db.collection('departments');

        // Validate if the department already exists
        const existingDepartment = await collection.findOne({ name: department.name });
        if (existingDepartment) {
            throw new Error('DEPARTMENT_ALREADY_EXISTS');
        }

        const newDepartment = await collection.insertOne(department);

        return newDepartment;
    } catch (error) {
        throw error;
    }
};

const getDepartments = async () => {
    try {
        const db = await getClient();
        const collection = db.collection('departments');

        // Get all departments
        const departments = await collection.find({}).toArray();
        if (!departments) {
            throw new Error('DEPARTMENTS_NOT_FOUND');
        }

        return departments;
    } catch (error) {
        throw error;
    }
}

const updateDepartment = async (id, department) => {
    try {
        const db = await getClient();
        const collection = db.collection('departments');

        // Convert string id to ObjectId
        const objectId = new ObjectId(id);

        // Validate if the department already exists
        const existingDepartment = await collection.findOne({ name: department.name });
        if (existingDepartment) {
            throw new Error('DEPARTMENT_ALREADY_EXISTS');
        }

        // Check if the department exists before updating
        const updatedDepartment = await collection.findOneAndUpdate(
            { _id: objectId },
            { $set: department },
            { returnDocument: 'after' }
        );
        if (!updatedDepartment) {
            throw new Error('DEPARTMENT_NOT_FOUND');
        }

        return updatedDepartment;
    } catch (error) {
        throw error;
    }
};

const deleteDepartment = async (id) => {
    try {
        const db = await getClient();
        const collection = db.collection('departments');

        // Convert string id to ObjectId
        const objectId = new ObjectId(id);

        // Check if the department exists before deleting
        const deletedDepartment = await collection.findOneAndDelete({ _id: objectId });
        if (!deletedDepartment) {
            throw new Error('DEPARTMENT_NOT_FOUND');
        }

        return deletedDepartment;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
};
