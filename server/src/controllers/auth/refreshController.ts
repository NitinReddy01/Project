import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../../model/User";

const handleRefreshToken= async (req:Request,res:Response)=>{
    const token:string | undefined =req.cookies?.jwt;
    if(!token) return res.sendStatus(401);
    const user=await User.findOne({refreshToken:token});
    if(!user) return res.sendStatus(403);
    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET!,(err,decoded)=>{
        const decode= decoded as {mail:string};
        if(err || decode?.mail !== user.email ) return res.sendStatus(403);
        const accessToken=jwt.sign(
            {mail:user.email},
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn:'1h'}
        );
        res.send({accessToken});
    });
}
export default handleRefreshToken;