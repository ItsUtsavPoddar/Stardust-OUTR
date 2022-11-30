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

const JWT_SECRET = process.env.JWT_SECRET;

// Route to get hospital info (doesn't require login)
router.route('/getdoctors')
.get(fetchhospital, async (req, res)=>{
    let success = false;

    try{
       
        // Check if the requested hospital exists
        let hospital = await Hospital.findById(req.hospital.id);
        if(!hospital){
            return res.status(400).json({success, error: 'Sorry, this hospital does not exists in our database'});
        }

        let doctors = await Doctor.find({hospital: req.hospital.id});

        success = true;
        return res.json({success, doctors});


    }catch(error){
        console.log(error);
        res.json({success: false, error: 'Something Went Wrong!'});
    }
})


module.exports = router;