import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import corsConfig from "./config/corsConfig";
import connectToDb from "./config/dbConnect";
import cookieParser from 'cookie-parser';
import allowCredentials from './middleware/allowcredentials';
import router from './routes/auth';
import verifyJWT from './middleware/verifyJWT';
const app=express();

dotenv.config();
connectToDb();

app.use(allowCredentials);
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',router);
app.use(verifyJWT);
app.get('/api/',(req,res)=>{
    res.send("Home");
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
});