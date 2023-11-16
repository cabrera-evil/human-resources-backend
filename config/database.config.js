const { MongoClient } = require('mongodb');

let client;

const connectToMongoDB = async () => {
    try {
        if (!client) { // Check if the client is not already connected
            const newClient = await MongoClient.connect(process.env.MONGODB_URI);

            client = newClient.db(); // Get the default database from the client
        }

        return client;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        throw err;
    }
};

module.exports = {
    connectToMongoDB,
    getClient: () => client,
};
