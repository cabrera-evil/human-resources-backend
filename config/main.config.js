var dotenv = require('dotenv');
dotenv.config();

const db = require('./database.config.js');
db.connectToDatabase()