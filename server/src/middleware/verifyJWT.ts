import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const verifyJWT=(req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) return res.sendStatus(401);
    const token=authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,
        (err,decode)=>{
            if(err) return res.sendStatus(403);
            next();
        })
}
export default verifyJWT;