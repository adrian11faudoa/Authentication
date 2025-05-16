const mongoose = require('mongoose');
require('dotenv').config();
/**
 * -------------- DATABASE ----------------
 */

const conn = process.env.MONGO_URI;

const connection = mongoose.createConnection(conn);

//The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
},{
    timestamps: true //createdAt, updatedAt
});


const User = connection.model('User', UserSchema);

module.exports = connection;


