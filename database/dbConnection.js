import mongoose from "mongoose";

export const dbConnection = () =>{
    mongoose
    .connect(process.env.MONGO_URI,{
        dbName:"HOPITAL_MANAGEMENT_SYSTEM",
    })
    .then(()=>{ console.log('Connected to Database!')})
    .catch((err)=>{ console.log(`Some Error Occured While Connecting to Database ${err}`)})
}