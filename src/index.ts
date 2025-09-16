import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cors from 'cors'

import authRouter from "./Routes/Auth/auth.routes.js";
import userRouter from "./Routes/User/user.routes.js";
import habitRouter from "./Routes/Habits/habit.routes.js";

const app = express()


app.use(express.json())
app.use(cors({
    origin:["https://exp-club-fe.vercel.app","http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
}))



app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Welcome to exp.club task backend"
    })
});
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/habits",habitRouter);





app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT || 4000}`)
})


