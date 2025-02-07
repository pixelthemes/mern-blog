import {JWT_EXPIRE_TIME,JWT_KEY} from "../config/config.js";
import jwt from 'jsonwebtoken';

export const TokenEncode = (email,user_id)=>{
    console.log(TokenEncode)
    const KEY = JWT_KEY
    const EXPIRE={expiresIn: JWT_EXPIRE_TIME}
    const PAYLOAD={email:email,user_id:user_id}
    return jwt.sign(PAYLOAD,KEY,EXPIRE)
}

export const TokenDecode =(token)=>{
    console.log(TokenDecode)
    try{
        return jwt.verify(token,JWT_KEY)
    } catch(error){
        return null
    }
}