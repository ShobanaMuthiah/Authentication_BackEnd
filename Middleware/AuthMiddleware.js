import jwt from 'jsonwebtoken';
import UserCollection from '../Models/UserSchema.js';
import dotenv from 'dotenv';
dotenv.config();

const AuthMiddleware=async (req,res,next)=>{
const token=req.header('Authorization')
if(!token)
    {
        res.status(404).json({message:"Token not found"})
    }
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decode;
        const user=await UserCollection.findById(req.user._id)
        if(!user){
            res.status(401).json({message:"access denied! not a valid User"})
        }
        next()
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}
export default AuthMiddleware;