const mongoose = require('mongoose');


const otpSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    email: {type: String, required: true},
    otp: {type: Number, required: true}
});

module.exports = mongoose.model('otp', otpSchema);