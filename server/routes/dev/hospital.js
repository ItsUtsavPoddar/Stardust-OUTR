// Using enviroment variables to save data from being published online
require("dotenv").config();

const expess = require("express");
const router = expess.Router();
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Hospital = require("../../models/Hospital");

const JWT_SECRET = process.env.JWT_SECRET;

// route to add a hospital
router.route('/addhospital')
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

        // Checking if hospital already exists
        let hospital = await Hospital.findOne({email: data.email});
        if(hospital){
            return res.status(400).json({success, error: 'Sorry, a user with this email id already exists!'});
        }

        hospital = await Hospital.findOne({mobile_no: data.mobile_no});
        if(hospital){
            return res.status(400).json({success, error: 'Sorry, a user with this mobile number already exists!'});
        }

        // Using bcrypt to generate a secured password (Future Use)

        // Crating a salt from bcrypt
        const securedPassword = await bcrypt.hash(data.password.toString(), 10);

        hospital = await Hospital.create({
            name: data.name,
            email: data.email,
            mobile_no: data.mobile_no.toString(),
            password: securedPassword,
            parent_company: data.parent_company,
            shift: data.shift,
            location: data.location,
            hospitals: data.hospitals,
            beds: data.beds,
            medicinecenter: data.medicinecenter,
            pincode: data.pincode
        })

        success = true;
        res.json({success, info: 'Hospital Added Successfully!!'});

    }catch(error){
        console.log(error);
        res.json({error: 'Something Went Wrong!'});
    }
});

// route to update a hospital
router.route('/updatehospital')
.post( async (req, res)=>{
    let success = false;

    let data = req.body;

    try{
        // TODO - make a update hospital route

        // Check if the hospital exists
         let hospital = await Hospital.findOne({email: data.email});
         if(!hospital){
             return res.status(400).json({success, error: 'Sorry, Cannot find a hospital with this email id!'});
         }

         const response = await Hospital.updateOne({email: data.email}, 
            {
                name: data.name,
                email: data.email,
                mobile_no: data.mobile_no,
                password: securedPassword,
                parent_company: data.parent_company,
                shift: data.shift,
                location: data.location,
                hospitals: data.hospitals,
                beds: data.beds,
                medicinecenter: data.medicinecenter,
            }
        )

        success = true;
        res.json({success, info: 'Hospital Details Updated Successfully!!'});

    }catch(error){
        console.log(error);
        res.json({error: 'Something Went Wrong!'});
    }
});


module.exports = router;