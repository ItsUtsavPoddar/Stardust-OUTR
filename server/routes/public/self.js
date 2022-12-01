// Using enviroment variables to save data from being published online
require('dotenv').config();

const expess = require('express');
const router = expess.Router();
const User = require("../../models/User");
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../../middleware/fetchuser');
const otpverify = require('../../middleware/otpverify');
const OTP = require('../../models/OTP');
const {Auth} = require('two-step-auth');

const JWT_SECRET = process.env.JWT_SECRET;




router.route('/')
.get(fetchuser, async (req, res)=>{

    let success = false;

    try{
        let user = await User.findById(req.user.id, 'name email mobile_no');

        if(!user){
            return res.status(400).json({success, error: "Invalid User"});
        }
        success = true;
        res.json({success, user});

    }catch(error){
        console.log(error);
        res.json({success: false, error: 'Something Went Wrong!'});
    }

})


module.exports = router;