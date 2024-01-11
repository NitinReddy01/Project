import nodemailer from 'nodemailer';

const mailController=(email:string,message:string)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.MAIL,
            pass:process.env.PASSWORD
        }
    });
    const response = transporter.sendMail({
        from:process.env.MAIL,
        to:email,
        subject:'Email Verification',
        html:message
    }).then((info)=>{
        return {info,sent:true};
    }).catch((err)=>{
        return {err,sent:false};
    });
    return response;
}
export default mailController;