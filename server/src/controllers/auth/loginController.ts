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
    if(!user) return res.sendStatus(401);
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
        res.sendStatus(401);
    }
}
export default loginController;
