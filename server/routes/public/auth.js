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
const OTP = require('../models/OTP');
const {Auth} = require('two-step-auth');

const JWT_SECRET = process.env.JWT_SECRET;

/*

╭━━━╮╱╱╱╱╱╭╮╱╱╱╱╱╭╮
┃╭━╮┃╱╱╱╱╭╯╰╮╱╱╱╭╯┃
┃╰━╯┣━━┳╮┣╮╭╋━━╮╰╮┃
┃╭╮╭┫╭╮┃┃┃┃┃┃┃━┫╱┃┃
┃┃┃╰┫╰╯┃╰╯┃╰┫┃━┫╭╯╰╮
╰╯╰━┻━━┻━━┻━┻━━╯╰━━╯

*/

// Creating a user using POST: (/api/auth/createuser) , Doesn't require auth (or no login required);
router.route('/createuser')
.post([
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('password').isLength({min: 6}),
    body('email').isLength({min: 6}),
    body('mobile_no').isLength({min: 10})
],otpverify, async (req, res)=>{
    let success = false;
    
    // Validating if name/email/password/reg_id/mobile_no is acceptable
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()});
    }

    // Saving req data into a variable
    let data = req.body;

    try{
    // Checking if user already exists
    let user = await User.findOne({registration_id: data.registration_id});
    if(user){
        return res.status(400).json({success, error: 'Sorry, a user with this registration id already exists!'});
    }

    // Checking if user already exists
    user = await User.findOne({mobile_no: data.mobile_no});
    if(user){
        return res.status(400).json({success, error: 'Sorry, a user with this mobile already exists!'});
    }

    // Checking if user already exists
    user = await User.findOne({email: req.email});
    if(user){
        return res.status(400).json({success, error: 'Sorry, a user with this email already exists!'});
    }

    // Using bcrypt to generate a secured password

    // Crating a salt from bcrypt
    const securedPassword = await bcrypt.hash(data.password.toString(), 10);

    // Creating the user
    user = await User.create({
        name: data.name,
        password: securedPassword,
        email: req.email,
        mobile_no: data.mobile_no
    })

    const returnData = {
        user: {
            id: user.id
        }
    }
    success = true;
    res.json({success, info: 'Account Created Successfully!!'});
    } catch(error){
        console.log(error);
        res.json({error: 'Something Went Wrong!'});
    }
});

/*


╭━━━╮╱╱╱╱╱╭╮╱╱╱╱╭━━━╮
┃╭━╮┃╱╱╱╱╭╯╰╮╱╱╱┃╭━╮┃
┃╰━╯┣━━┳╮┣╮╭╋━━╮╰╯╭╯┃
┃╭╮╭┫╭╮┃┃┃┃┃┃┃━┫╭━╯╭╯
┃┃┃╰┫╰╯┃╰╯┃╰┫┃━┫┃┃╰━╮
╰╯╰━┻━━┻━━┻━┻━━╯╰━━━╯

*/

// Authenticate a user using POST: (/api/auth/login) , Doesn't require auth (or no login required);

router.route('/login')
.post([
    body('registration_id', 'Enter a Registration ID').exists(),
    body('password', 'Password cannot be blank').exists()
], async (req, res)=>{
    // Validating if employeeid/password/name is acceptable
    const errors = validationResult(req);
    let success = false;

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {registration_id, password} = req.body;
    

    try{
        let user = await User.findOne({registration_id}).exec();

        if(!user){
            return res.status(400).json({success, error: "Please, login with correct credentials"});
        }

        const passwordCompare =  await bcrypt.compare(password.toString(), user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please, login with correct credentials"})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(payload, JWT_SECRET);
        success = true;
        res.json({success, authtoken});

    }catch(error){
        console.log(error);
        res.json({success: false, error: 'Something Went Wrong!'});
    }

})

router.route('/generateotp')
.post([body('email').isLength({min: 7})],async (req, res)=>{
    try{
        const data = req.body;

        // Checking if user already exists
        const user = await User.findOne({email: data.email});
        if(user){
            return res.status(400).json({success: false, error: 'Sorry, a user with this email already exists!'});
        }

        // Code to generate otp
        const response = await Auth(data.email, "uPortal");
        if (!response.success) return res.status(500).json({success: false, error: 'somthing went wrong!'});
        await OTP.create({
            email: response.mail,
            otp: response.OTP
        })
        return res.json({success: true, info: "OTP sent!"});
    }catch(error){
        console.log(error);
        res.json({success: false, error: 'Something Went Wrong!'});
    }
})


module.exports = router;