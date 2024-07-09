import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        validate: {
            validator: (value) => value.length === 11,
            message: 'Please provide a valid phone number (must be 11 digits)'
          },
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please Provide a valid Email"]
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:(value)=>value.length>=8,
            message: "Required atleast 8 digits!"
        },
        Selection : false
        },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending",
        required:true
    },
})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password= await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password) //return true and false
}


userSchema.methods.generateWebToken = async function(){
    // return token generation ( { id }, jwt_key, {expiresIn : jwt_expires})
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{  expiresIn: process.env.JWT_EXPIRES } )
}


export const User=mongoose.model('User',userSchema);