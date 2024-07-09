import express from "express";
import { config } from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from './router/messageRouter.js'
import userRouter from './router/userRouter.js'
import cors from 'cors';
import cookieParser from "cookie-parser";
import { errorMiddleware }  from "./middlewares/errorMiddleware.js";
const app = express();
config({path:'./config/config.env'})

app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.BACKEND_URL],
    methods:['GET','POST',"DELETE","PUT"],
    credentials:true
}))

dbConnection();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api/v1/message', messageRouter)
app.use('/api/v1/user', userRouter)

app.use(errorMiddleware)
export default app;