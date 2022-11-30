const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mobile_no: {type: String, required: true, unique: true},
    specialization: [{
        type: String,
        enum: ["diabetologist", "oncologist", "nephrologist", "plumonologist", " neurologist "],
        default: "diabetologist"
        }],
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital',
        required: true
    },
    shift: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shift'}],
    password: {type: String}
});

module.exports = mongoose.model('doctor', doctorSchema);