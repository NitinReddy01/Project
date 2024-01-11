import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    refreshToken:String,
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationCode:{
        type:String,
        required:true
    }
})

export const User=mongoose.model('users',userSchema);