import { Request, Response } from "express";
import { User } from "../../model/User";
import bcrypt from 'bcrypt';

interface regiserBody{
    username:string | undefined;
    password:string | undefined;
    email:string | undefined;
}

const registerController= async (req:Request,res:Response)=>{
    const {username,password,email}:regiserBody=req.body;
    if(!username || !password || !email){
        return res.status(400).send({message:"Please provide all the fields"});
    }
    const dup= await User.findOne({$or:[{username:username},{email:email}]});
    if(dup){
        if(dup.username===username){
            return res.status(409).send({message:`User with ${username} already exists`});
        }
        else{
            return res.status(409).send({message:"Email already in use"});
        }
        
    } 
    try {
        const hashedPass=await bcrypt.hash(password,10);
        await User.create({
            username,
            password:hashedPass,
            email
        })
        res.status(201).send({message:`User ${username} registered`});
    } catch (error) {
        let message;
        if(error instanceof Error) message=error.message;
        else message=String(error);
        res.status(500).send({message});
    }
}
export default registerController;