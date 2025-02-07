import UserModel from "../model/UsersModel.js";
import {TokenEncode} from "../utility/tokenUtility.js"  // Change This Code By Project Requirement
import {JWT_EXPIRE_TIME} from "../config/Config.js";
//import md5 from 'md5';
import mongoose from "mongoose";
import SendEmail from "../utility/emailUtility.js"

{/*
export const RegistrationService = async (req)=> {
    try {
        let email=req.params.email;
        let code = Math.floor(100000+Math.random()*900000);
        let EmailText = `Your email address is <br><h2>${email}</h2>`;
        let EmailSubject = 'Email Verification'

        await SendEmail(email,EmailText,EmailSubject);

        await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true});
        return {status:"success",message:"6 Digit OTP Has Been sent successfully."};
    } catch (error) {
        return {status:"Fail",message:error.toString()}
    }
}


//Verify
export const VerifyOTPService = async (req) => {
    try {
        const email = req.params.email || req.body.email; // Use params or body
        const otp = req.params.otp || req.body.otp; // Use params or body

        // Check if the email and OTP combination exists
        const total = await UserModel.countDocuments({ email: email, otp: otp });

        if (total === 1) {
            // Retrieve User ID
            const user = await UserModel.findOne({ email: email, otp: otp }).select('_id');

            // Create Token
            const token = TokenEncode(email, user._id.toString());

            // Update OTP to 0
            await UserModel.updateOne({ email: email }, { $set: { otp: "0" } });

            return { status: "success", message: "Valid OTP", token: token };
        } else {
            return { status: "fail", message: "Invalid OTP" };
        }
    } catch (e) {
        console.error("Error in VerifyOTPService:", e);
        return { status: "Fail", message: e.toString() };
    }
};
*/}


export const RegistrationService=async (req)=>{

    try{
        let reqBody = req.body;
        //reqBody.password = md5(req.body.password);
        reqBody.password = req.body.password;

        let user = await UserModel.find({reqBody})
        if(user.length >0){
            return {status:"error",message:"Have Account"};
        } else {
            let data = await UserModel.create(reqBody);
            return  {status:"success",message:"Registration Successful",data:data}
        }
    }  catch(err){
        return  {status:"error",error:err.toString()};
    }
};

/*
export const LoginService=async (req,res)=> {

    try {
        // Ensure body is parsed correctly
        const reqBody = req.body;
        console.log(reqBody);
        const email = reqBody.email;
        //const password = md5(reqBody.password);
        const password = reqBody.password;

        // Use aggregation to find matching user
        const matchingStage = { $match: { email, password } };
        //const projection = { $project: { _id: 1, email: 1 } };

        const data = await UserModel.aggregate([matchingStage]);

        if (data.length > 0) {
            const token = TokenEncode(data[0].email);

            // Set Cookie
            const options = {
                maxAge: JWT_EXPIRE_TIME,
                httpOnly: true,
                sameSite: 'Lax', // 'Lax' works in most local setups
                secure: false, // Must be false for HTTP (local development)
            };
            res.cookie('token', token, options);
            return { status: 'success', message: 'Login Successful', token, data: data[0] };
        } else {
            return { status: 'Unauthorized', message: 'Invalid email or password' };
        }
    } catch (err) {
        return  {status:"error",error:err.toString()};
    }



};

 */

export const LoginService = async (req,res) => {
    try {
        const { email, password } = req.body;

        // ইনপুট চেক
        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "Need All Info"
            });
        }

        // ডাটাবেজ থেকে ব্যবহারকারী খোঁজা
        let user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "No User Found"
            });
        }

        // পাসওয়ার্ড যাচাই (সরাসরি মিলিয়ে দেখা)
        if (user.password !== password) {
            return res.status(401).json({
                status: "failed",
                message: "Wrong Password"
            });
        }

        // টোকেন তৈরি
        const token = TokenEncode(user.email);

        // কুকি সেট করা
        res.cookie('token', token, {
            maxAge: JWT_EXPIRE_TIME,
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
        });

         res.status(200).json({
            status: 'success',
            message: 'Login Successful',
            token,
            data: { id: user._id, email: user.email }
        });

    } catch (err) {
        return res.status(500).json({
            status: "error",
            error: err.toString()
        });
    }

};







export const LogoutService = async (req, res) => {
    try {
        // Clear the authentication cookie
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'Lax', // Consider if you really need 'None'
            secure: false, // Ensure you're serving over HTTPS
        });

        return { status: 'success', message: 'Logout Successful' };
    } catch (err) {
        return { status: 'error', error: err.toString() };
    }
};



