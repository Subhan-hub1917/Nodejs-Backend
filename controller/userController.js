import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const userController = catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,phone,address,email,password,role,status}=req.body
    if(!firstName||!lastName||!phone||!address||!email||!password){
        return next(new ErrorHandler('Please Fill Complete Form',400));
    }
    const userExists=await User.findOne({email})
    if(userExists){
        return next(new ErrorHandler('User Already Exists',400));
    }
    const user=await User.create({firstName,lastName,phone,address,email,password,role,status})
    generateToken(user,200,"User Registered Successfully",res)
})

export const login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmpassword,role}=req.body
    if(!email||!password||!confirmpassword||!role){
        return next(new ErrorHandler('Please Fill Complete Form',400));
    }
    if(password!==confirmpassword){
        return next(new ErrorHandler('Password and Confirm Password Not Matched',400));
    }
    const userExists=await User.findOne({email}).select("+password")
    if(!userExists){
        return next(new ErrorHandler('Invalid Email and Password',400));
    }
    const isPassWordMatch=await userExists.comparePassword(password)
    if(!isPassWordMatch){
        return next(new ErrorHandler('Invalid Email or Password',400));
    }
    if(role !== userExists.role){
        return next(new ErrorHandler('User With This Role Not Found!',400));
    }
    generateToken(userExists,200,"User Logged In Successfully",res)
})

export const logoutUser = async(req,res,next)=>{
    res.status(200).cookie("userToken","" ,{
        httpOnly:true,
        expires: new Date(Date.now())
    }).json({
        success:true,
        message:"User Logout SuccessFully"
    })
}

export const getUsers = catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find()
    if(!users){
        return next(new ErrorHandler('No User Exist yet!',404))
    }
    res.status(200).json({
        success:true,
        message:"Fetched All Users Successfully!",
        data: users
    })
})
export const deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    const userExists=await User.findById(id)
    if(!userExists){
        return next(new ErrorHandler('This User Doest Not Exist!',404))
    }
    await userExists.deleteOne()
    res.status(200).json({
        success:true,
        message:"User Deleted Successfully!",
    })
})
export const updateUser = catchAsyncErrors(async(req,res,next)=>{
    const {id}=req.params
    const userExists=await User.findById(id)
    if(!userExists){
        return next(new ErrorHandler('This User Doest Not Exist!',404))
    }
    const user = await User.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        message:"User Updated Successfully!",
        data:user
        
    })
})