const mongoose = require('mongoose');


const medicineSchema = new mongoose.Schema({
    name: {type: String, required: true},
    disease: [{
        type: String,
        enum: ["cold", "fever"],
        default: "cold"
        }]
});

module.exports = mongoose.model('medicine', medicineSchema);