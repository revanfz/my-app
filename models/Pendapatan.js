const { Schema, model } = require('mongoose');

const incomeSchema = new Schema({
    value: {
        type: Number,
        required: true
    }
});

const Pendapatan = model('Pendapatan', incomeSchema);

module.exports = Pendapatan;