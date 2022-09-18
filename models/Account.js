const { Schema, model } = require('mongoose');

const now = new Date().getTime();
const accountSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Number,
        default: now,
    },
});

const Account = model('Account', accountSchema);

module.exports = Account;