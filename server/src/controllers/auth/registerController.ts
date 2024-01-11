import { Request, Response } from "express";
import { User } from "../../model/User";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import mailController from "./mailController";

interface registerBody{
    username:string | undefined;
    password:string | undefined;
    email:string | undefined;
}

const registerController= async (req:Request,res:Response)=>{
    const {username,password,email}:registerBody=req.body;
    if(!username || !password || !email){
        return res.status(400).send({message:"Please provide all the fields"});
    }
    const dup= await User.findOne({$or:[{username:username},{email:email}]});
    if(dup && dup.isVerified){
        if(dup.username===username ){
            return res.status(409).send({message:`User with ${username} already exists`});
        }
        else{
            return res.status(409).send({message:"Email already in use"});
        }
    }
    else if(dup && !dup.isVerified){
        await User.deleteOne({email:dup.email});
    } 
    try {
        const hashedPass= await bcrypt.hash(password,10);
        const verifyCode= username + crypto.randomBytes(16).toString('hex');
        await User.create({
            username,
            password:hashedPass,
            email,
            verificationCode:verifyCode
        })

        const link:string = `http://localhost:3000/verify?code=${verifyCode}`;
        const html:string=`<p> Click <a href=${link} >here</a> to verify </p>`;
        const mailResponse = await mailController(email,html);
        // console.log(mailResponse);
        if(!mailResponse.sent){
            return res.status(500).send({message:"Server error:Unable to send mail"})
        }
        res.status(201).send({message:`User ${username} registered. Verification mail sent`});
    } catch (error) {
        let message;
        if(error instanceof Error) message=error.message;
        else message=String(error);
        res.status(500).send({message});
    }
}
export default registerController;