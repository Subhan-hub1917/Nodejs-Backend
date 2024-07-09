import mongoose from "mongoose";
import validator from "validator";
const messageSchema = new mongoose.Schema({
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
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please Provide a valid Email"]
    },
    message:{
        type:String,
        required:true,
        minLenght:[10,"Message must contain atleast 10 letters"]
    }
})

export const Message=mongoose.model('Message',messageSchema);