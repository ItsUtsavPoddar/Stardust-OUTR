// Using enviroment variables to save data from being published online
require('dotenv').config();

const expess = require('express');
const router = expess.Router();
const User = require("../../models/User");
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const fetchhospital = require('../../middleware/fetchhospital');
const {Auth} = require('two-step-auth');
const Hospital = require('../../models/Hospital');

const JWT_SECRET = process.env.JWT_SECRET;


// Authenticate a HOSPITAL using POST: (/api/auth/login) , Doesn't require auth (or no login required);

router.route('/login')
.post([
    body('email', 'Enter a emailid').exists(),
    body('password', 'Password cannot be blank').exists()
], async (req, res)=>{
    // Validating if employeeid/password/name is acceptable
    const errors = validationResult(req);
    let success = false;

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    

    try{
        let hospital = await Hospital.findOne({email}).exec();

        if(!hospital){
            return res.status(400).json({success, error: "Please, login with correct credentials"});
        }

        const passwordCompare =  await bcrypt.compare(password.toString(), hospital.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please, login with correct credentials"})
        }

        const payload = {
            hospital: {
                id: hospital.id
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

module.exports = router