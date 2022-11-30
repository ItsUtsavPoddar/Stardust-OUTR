// Using enviroment variables to save data from being published online
require("dotenv").config();

const expess = require("express");
const router = expess.Router();
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Medicine = require("../../models/Medicine");
const MedicineCenter = require("../../models/MedicineCenter");

const JWT_SECRET = process.env.JWT_SECRET;

// route to add a medicine
router.route('/addmedicine')
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

        // Checking if medicine already exists
        let medicine = await MedicineCenter.findOne({name: data.name});
        if(medicine){
            return res.status(400).json({success, error: 'Sorry, a user with this email id already exists!'});
        }         

        medicine = await MedicineCenter.create({
            name: data.name,
            email: data.email,
            hospital: data.hospital,
            medicine_stock: medicine_stock,
            location: data.location
        })

        success = true;
        res.json({success, info: 'MedicineCenter Added Successfully!!'});

    }catch(error){
        console.log(error);
        res.json({error: 'Something Went Wrong!'});
    }
});

// route to update a medicine
router.route('/updatemedicine')
.post( async (req, res)=>{
    let success = false;

    let data = req.body;

    try{
        // TODO - make a update medicine route

        // Check if the medicine exists
         let medicine = await MedicineCenter.findOne({email: data.email});
         if(!medicine){
             return res.status(400).json({success, error: 'Sorry, Cannot find a medicine Center with this email id!'});
         }

         const response = await MedicineCenter.updateOne({email: data.email}, 
            {
                name: data.name,
                email: data.email,
                hospital: data.hospital,
                medicine_stock: medicine_stock,
                location: data.location
            }
        )

        success = true;
        res.json({success, info: 'Medicine Center Details Updated Successfully!!'});

    }catch(error){
        console.log(error);
        res.json({error: 'Something Went Wrong!'});
    }
});


module.exports = router;