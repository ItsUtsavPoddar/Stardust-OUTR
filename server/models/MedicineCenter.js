const mongoose = require('mongoose');


const medicinecenterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital'
    },
    medicine_stock: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'medicine'
    }],
    location: { type: [Number], index: { type: '2dsphere', sparse: true}, required: true}
});

module.exports = mongoose.model('medicinecenter', medicinecenterSchema);