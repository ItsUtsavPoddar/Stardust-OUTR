// Using enviroment variables to save data from being published online
require('dotenv').config();

const expess = require('express');
const router = expess.Router();
const User = require("../../models/User");
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchhospital = require('../../middleware/fetchhospital');
const {Auth} = require('two-step-auth');
const Hospital = require('../../models/Hospital');
const Doctor = require('../../models/Doctor');
const Record = require('../../models/Record');

const JWT_SECRET = process.env.JWT_SECRET;

// Route to get hospital info (doesn't require login)
router.route('/getpatient')
.post( async (req, res)=>{
    let success = false;
    const data = req.body;
    try{
       
        // Check if the requested hospital exists
        let user = await User.findById(data.user);
        if(!user){
            return res.status(400).json({success, error: 'Sorry, this hospital does not exists in our database'});
        }

        let record = await Record.find({patient: data.user});

        var doctor = [];
        var hospital = [];

        var promise = record.map(async (item)=>{
            let doc = await Doctor.findById(item.doctor, 'name');
            let hos = await Hospital.findById(item.hospital, 'name');

            doctor.push(doc);
            hospital.push(hos);
        })

        Promise.all(promise).then(()=>{
            success = true;
            return res.json({success, record, doctor, hospital});
        });


    }catch(error){
        console.log(error);
        res.json({success: false, error: 'Something Went Wrong!'});
    }
})


module.exports = router;