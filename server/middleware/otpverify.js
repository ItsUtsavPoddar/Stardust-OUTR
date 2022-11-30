const OTP = require("../models/OTP");


otpverify = async (req, res, next)=>{

    try{
        const email = req.header('email');
        
        /*
        const otp = req.header('otp');

        const login = await OTP.findOne({email}).exec();

        // case if no otp email found
        if(!login){
            return res.status(401).json({success: false, error: 'Bad Request!'});
        }

        if(otp != login.otp){
            return res.status(400).json({success: false, error: 'OTP verification failed!'});
        }
        */
        
        req.email = email;
        next();
    }catch(error){
        console.log(error)
        res.status(401).send({error: "Token Validation Error!"})
    }
}

module.exports = otpverify;