var debug = require('debug')('human-resources-backend:database');

require('./enviroment.config');
const { connectToMongoDB } = require('./database.config');

const ApiConfig = async () => {
    try {
        await connectToMongoDB();
        debug('Successfully connected to database!');
    } catch (err) {
        debug(`Error connecting to database: ${err}`);
    }
}

module.exports = ApiConfig;