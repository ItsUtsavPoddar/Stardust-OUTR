// Using enviroment variables to save data from being published online
require("dotenv").config();

const expess = require("express");
const router = expess.Router();
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require("../../models/Doctor");

const JWT_SECRET = process.env.JWT_SECRET;

// route to add a doctor
router.route('/adddoctor')
.post([
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('password').isLength({min: 6}),
    body('email').isLength({min: 4})
], async (req, res)=>{
    let success = false;

    // Validating if entry is acceptable
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    // Saving req data into a variable
    let data = req.body;

    try{

        // Checking if doctor already exists
        let doctor = await Doctor.findOne({email: data.email});
        if(doctor){
            return res.status(400).json({success, error: 'Sorry, a user with this email id already exists!'});
        }

        doctor = await Doctor.findOne({mobile_no: data.mobile_no});
        if(doctor){
            return res.status(400).json({success, error: 'Sorry, a user with this mobile number already exists!'});
        }

        // Using bcrypt to generate a secured password (Future Use)

        // Crating a salt from bcrypt
        const securedPassword = await bcrypt.hash(data.password.toString(), 10);

        doctor = await Doctor.create({
            name: data.name,
            password: securedPassword,
            email: data.email,
            mobile_no: data.mobile_no,
            hospital: data.hospital,
            shift: data.shift,
            specialization: data.specialization
        })

        success = true;
        res.json({success, info: 'Doctor Added Successfully!!'});

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


module.exports = router;