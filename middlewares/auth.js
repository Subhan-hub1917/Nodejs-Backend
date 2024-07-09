import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from 'jsonwebtoken';

export const isUserAuthenticated=catchAsyncErrors(async (req,res,next)=>{
    const token=req.cookies.userToken
    if(!token){
        return next(new ErrorHandler('User is Not Authenticated',400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY )
    req.user= await User.findById(decoded.id)
    if(req.user.role !== 'user'){
        return next( new ErrorHandler(`${req.user.role} is not authorized for resouces`,403))
    }
    next();
})