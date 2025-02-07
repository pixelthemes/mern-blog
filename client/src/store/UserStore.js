import {create} from "zustand";
import axios from "axios";
import {getEmail,setEmail,unauthorized} from "../utility/utility.js";
import Cookies from "js-cookie";

const UserStore=create((set)=>({

    isLogin:()=>{
        return !!Cookies.get('token');
    },
    logInData: {email:"", password:""},
    loginOnchange: (name, value) => {
        set((state) => ({
            logInData :{
                ...state.logInData,
                [name]: value
            }
        }))
    },
    LogInRequest:async (reqBody)=>{
      let url =  `http://localhost:2000/api/VerifyOTP`

        let res = await axios.get(url,reqBody)
        if(res.data['status']==='success'){
            set({logInData: res.data.token})
            Cookies.set('token',res.data.token);
        }
        return res.data['status']==='success'
    },

    LoginFormData:{email:""},
    LoginFormChange:(name,value)=>{
        set((state)=>({
            LoginFormData:{
                ...state.LoginFormData,
                [name]:value
            }
        }))
    },


    UserOTPRequest:async (email,password)=>{
        set({isFormSubmit:true})
        console.log(email)
        let res = await axios.get(`/api/VerifyOTP`,{email:email,password:password});
       // setEmail(email);
        set({isFormSubmit:false})
        return res.data['status']==="success";
    },


    UserLogoutRequest:async ()=>{
        set({isFormSubmit:true})
        let res = await axios.post(`/api/UserLogout`);
        set({isFormSubmit:false})
        return res.data['status']==="success";
    },


    OTPFormData:{otp:""},
    OTPFormOnChange:(name,value)=>{
        set((state)=>({
            OTPFormData:{...state.OTPFormData,
                [name]:value}
        }))
    },



    VerifyLoginRequest:async (otp)=>{
        set({isFormSubmit:true})
        let email= getEmail();
        console.log(email,otp)
        let res=await axios.get(`/api/VerifyOTP/${email}/${otp}`);
        set({isFormSubmit:false})
        return res.data['status']==="success";
    },

    isFormSubmit:false,





}))

export default UserStore;


