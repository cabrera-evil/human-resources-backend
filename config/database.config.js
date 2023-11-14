const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(url);
        console.log('Connection established to', url);

        // If you need to do something with the database, you can access it using: client.db('your-database-name')

        // Return the client so that it can be used elsewhere in your application
        return client;
    } catch (err) {
        console.log('Unable to connect to the MongoDB server. Error:', err);
        throw err; // Rethrow the error to handle it further up the chain
    }
}

module.exports = {
    connectToDatabase: connectToDatabase,
    url: url
};
