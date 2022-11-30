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

const JWT_SECRET = process.env.JWT_SECRET;

// Route to get hospital info (doesn't require login)
router.route('/gethospitals')
.get(async (req, res)=>{
    let success = false;

    try{
       

    }catch(error){
        console.log(error);
        res.json({success: false, error: 'Something Went Wrong!'});
    }
})


module.exports = router;