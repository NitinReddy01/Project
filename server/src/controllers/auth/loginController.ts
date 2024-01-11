import { Request, Response } from "express";
import { User } from "../../model/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface loginBody{
    email:string | undefined,
    password:string | undefined
}

const loginController= async (req:Request,res:Response)=>{
    const {email,password}:loginBody = req.body;
    if(!email || !password){
        return res.status(400).send({message:"Username or password missing"});
    }
    const user= await User.findOne({email});
    if(!user) return res.status(401).send({message:`No User found with ${email}`});
    if(!user.isVerified) return res.status(403).send({message:"Email is not verified"})
    const match= await bcrypt.compare(password,user.password);
    if(match){
        const accessToken=jwt.sign(
            {mail:email},
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn:'10s'});
        const refreshToken=jwt.sign({
            mail:email},
            process.env.REFRESH_TOKEN_SECRET!,
            {expiresIn:'1h'});
        user.refreshToken=refreshToken;
        await user.save();
        res.cookie('jwt',refreshToken,{httpOnly:true,secure:true,sameSite:'none'});
        res.send({accessToken,username:user.username});
    }
    else{
        res.status(401).send({message:"Incorrect Password"});
    }
}
export default loginController;
