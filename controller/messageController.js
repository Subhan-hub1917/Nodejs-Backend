import { Message } from "../models/messageSchema.js"
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'
export const messageSend = catchAsyncErrors(async(req,res,next)=>{
    const { firstName,lastName,phone,email,message }=req.body
    if ( !firstName || !lastName || !phone || !email|| !message){
        return next(new ErrorHandler('Please Fill Full Form',400));
    }
    const newMessage = await Message.create({firstName,lastName,phone,email,message})
    res.status(200).json({
        success:true,
        message:'Message Sent Successfully!',
        data: newMessage
    })
})