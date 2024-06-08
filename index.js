import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Database/Config.js';
import UserRoutes from './Routers/UserRoutes.js';

dotenv.config();

const app=express();

app.use(express.json());

app.use(cors({
    origin:"*",
    credentials:true
}))
connectDB();

app.use('/api',UserRoutes)

app.use('/',(req,res)=>{
res.status(200).send("App is running on the respective Port")
})


app.listen(process.env.port,()=>{
    console.log("App is runnig successfully")
})