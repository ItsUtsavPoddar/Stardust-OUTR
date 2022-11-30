const mongoose = require('mongoose');


const slotSchema = new mongoose.Schema({
    Doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    time: {type: Date, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('slot', slotSchema);