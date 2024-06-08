import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    token:String
})

const UserCollection=mongoose.model("User",UserSchema)

export default UserCollection;