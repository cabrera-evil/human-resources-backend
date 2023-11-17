var debug = require('debug')('human-resources-backend:database');
const { MongoClient } = require('mongodb');

let client;

const connectToMongoDB = async () => {
    try {
        if (!client) {
            const newClient = await MongoClient.connect(process.env.MONGODB_URI);
            client = newClient.db();
        }

        return client;
    } catch (err) {
        throw err;
    }
};

const initializeDatabase = async () => {
    try {
        await connectToMongoDB();
        debug('Successfully connected to the database!');
    } catch (err) {
        debug('Error connecting to the database!');
    }
};

module.exports = {
    initializeDatabase,
    getClient: () => client,
};
