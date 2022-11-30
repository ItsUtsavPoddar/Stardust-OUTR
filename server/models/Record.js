const mongoose = require('mongoose');


const recordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital'
    },
    medicalslip: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medicalslip'
    }],
    recordref: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'record'
    }],
    reason: [{
        type: String,
        default: "cold"
    }],
    location: { type: [Number], index: { type: '2dsphere', sparse: true}, required: true},
    datetime: [{type: Date, default: Date.now}],
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('record', recordSchema);