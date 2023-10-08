import { Request, Response } from "express";
import { User } from "../../model/User";

const logoutController= async (req:Request,res:Response)=>{
    const token:string | null | undefined =req.cookies?.jwt;
    // console.log(req.cookies);
    if(!token) return res.sendStatus(204);
    const user = await User.findOne({refreshToken:token});
    if(!user){
        res.clearCookie('jwt',{httpOnly:true,sameSite:'none',secure:true});
        return res.sendStatus(204);
    }
    user.refreshToken='';
    await user.save();
    res.clearCookie('jwt',{httpOnly:true,secure:true,sameSite:'none'});
    return res.sendStatus(204);
}
export default logoutController;