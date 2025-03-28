import express,{json} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; 
import userRoute from "./Routes/user.js";


dotenv.config()
const app=express();



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(json())
app.use('/',userRoute);

mongoose.connect('mongodb://mongodb:27017/certiApp').then(() => {
    console.log(" MongoDB connected successfully to CertiApp");})
    .catch((error) => {
        console.error(" MongoDB connection failed:", error);
    });



app.listen(process.env.PORT,function(){
    console.log(`Sever Is Runing in ${process.env.PORT}`)
})
