const mongoose = require('mongoose');


const hospitalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mobile_no: [{type: String}],
    password: {type: String, required: true},
    parent_company: {type: String},
    location: { type: [Number], index: { type: '2dsphere', sparse: true}, required: true},
    pincode: { type: Number, required: true},
    size: { type: Number, default: 100},
    doctors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    }],
    beds: [{type: String}],
    medicinecenter: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medicinecenter'
    }]
});

module.exports = mongoose.model('hospital', hospitalSchema);