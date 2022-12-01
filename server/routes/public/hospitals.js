// Using enviroment variables to save data from being published online
require('dotenv').config();

const expess = require('express');
const router = expess.Router();
const User = require("../../models/User");
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../../middleware/fetchuser');
const {Auth} = require('two-step-auth');
const Hospital = require('../../models/Hospital');
const Slot = require('../../models/Slot');
const Doctor = require('../../models/Doctor');

const JWT_SECRET = process.env.JWT_SECRET;

// Route to get hospital info (doesn't require login)
router.route('/gethospitals')
.get(async (req, res)=>{
    let success = false;

    try{
        // TODO - Return hospitals based on location
        /* Use geonear */
        var hospitals = await Hospital.find({}, 'id name email parent_company location pincode size doctors')
        success = true;
        return res.json({success, hospitals});

    }catch(error){
        console.log(error);
        res.json({success: false, error: 'Something Went Wrong!'});
    }
})

router.route('/getslots')
.post(async (req, res)=>{
        
    let success = false;
    const data = req.body
    
    try{

        // checking if the hospital exists
        let hospital = await Hospital.findById(data.hospital);
        if(!hospital){ return res.status(400).json({success, info: "Hospital is invalid!"}) };

        // Find doctors for the hospital
        let doctors = await Doctor.find({hospital: data.hospital})

        var slots = [];
        
        // fetching all the slots from doctors id
        var promises = doctors.map(async (item)=>{
            var slot = await Slot.find({doctor: item.id})
            if(slot.length != 0) slots.push(slot);
        })

        Promise.all(promises).then(()=> {
            success = true;
        return res.json({success, slots, doctors});
        })
        


    }catch(error){
        console.log(error);
        res.json({success: false, error: 'Something Went Wrong!'});
    }
})


module.exports = router;