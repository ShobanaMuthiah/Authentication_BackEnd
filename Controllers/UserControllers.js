import bcryptjs from "bcryptjs";
import UserCollection from "../Models/UserSchema.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { forgot } from "../Services/Nodemailer.js";
dotenv.config();

export const registerUser=async (req,res)=>{
    try {
        const {username,email,password}=req.body;
        const mail=await UserCollection.findOne({email})
        if(mail){
            res.status(404).json({message:"mail ID has already existed"})
        }   
        const hashpassword=await bcryptjs.hash(password,10)
        const user=new UserCollection({username,email,password:hashpassword})
await user.save();
        res.status(200).json({message:"Registered Successfully",data:user})
        
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({message:" Registration Internal Server Error "})
    }
}

export const loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await UserCollection.findOne({email})
        if(!user){
            res.status(404).json({message:"Invalid mail ID"})
        }         
       const passwordMatch=await bcryptjs.compareSync(password,user.password)
if(!passwordMatch){
    res.status(404).json({message:"Password Mismatched"})
}
await user.save();
        res.status(200).json({message:"Login Successfully"})        
    } 
    
    catch (error) {
        console.log(error)
        res.status(500).json({message:" Internal Server Error in Login Page "})
    }
}

export const forgotPassword=async (req,res)=>{
    try {
        const {email}=req.body;
        const mailUser=await UserCollection.findOne({email});
        if(!mailUser){
            return res.status(404).json({message:"User not found"})
        }
        const token=jwt.sign({email},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        
await forgot(email,token)
 res.status(200).json({message:"password reset link send successfully"})
  
    }
     catch (error) {

        console.log(error);
        res.status(500).json({message:"Internal Server Error in forgot Page"})
    }
}

export const resetPassword=async (req,res)=>{
    try {
        const {token}=req.params;
        const {password}=req.body;
        if(!password){
           res.status(400).json({message:"Insert password"})
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET_KEY)
        
const user=await UserCollection.findOne({email:decode.email})


const hashpassword=await bcryptjs.hash(password,10);

await UserCollection.updateOne({email:decode.email},{password:hashpassword});
user.save();
 res.status(200).json({message:"reset successfully"})        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error in reset Page"})
    }
}