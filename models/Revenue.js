const { Schema, model } = require('mongoose');

const now = new Date().getTime();
const revenueSchema = new Schema({
    income: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: now
    }
});

const Revenue = model('Revenue', revenueSchema);

module.exports = Revenue;