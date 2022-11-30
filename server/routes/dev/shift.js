// Using enviroment variables to save data from being published online
require("dotenv").config();

const expess = require("express");
const router = expess.Router();
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require("../../models/Doctor");
const Shift = require("../../models/Shift");

const JWT_SECRET = process.env.JWT_SECRET;

// route to add a doctor
router.route('/addshift')
.post(async (req, res)=>{
    let success = false;
    // Saving req data into a variable
    let data = req.body;

    try{

        let shift = await Shift.create({
            startTime: data.startTime,
            endTime: data.endTime
        })

        success = true;
        res.json({success, info: 'Shift Added Successfully!!'});

    }catch(error){
        console.log(error);
        res.json({error: 'Something Went Wrong!'});
    }
});

// route to update a doctor
router.route('/updatedoctor')
.post( async (req, res)=>{
    let success = false;

    let data = req.body;

    try{
        // TODO - make a update doctor route

        // Check if the doctor exists
         let doctor = await Doctor.findOne({email: data.email});
         if(!doctor){
             return res.status(400).json({success, error: 'Sorry, Cannot find a doctor with this email id!'});
         }

         const response = await Doctor.updateOne({email: data.email}, 
            {
                name: data.name,
                password: securedPassword,
                email: data.email,
                mobile_no: data.mobile_no,
                hospital: data.hospital,
                shift: data.shift,
                specialization: data.specialization
            }
        )

        success = true;
        res.json({success, info: 'Doctor Details Updated Successfully!!'});

    }catch(error){
        console.log(error);
        res.json({error: 'Something Went Wrong!'});
    }
});


router.route('/')
.get(async (req, res)=>{
    try{
        let shifts = await Shift.find({});
        res.json({shifts});
    }catch(error){
        console.log(error);
        res.json({error: 'Something Went Wrong!'});
    }
})


module.exports = router;