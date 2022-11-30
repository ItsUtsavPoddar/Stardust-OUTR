const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    startTime: {type: Date},
    endTime: {type: Date}
});

module.exports = mongoose.model('shift', shiftSchema);