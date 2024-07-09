export const generateToken=async(user,statusCode,message,res)=>{
try{
        const token =await user.generateWebToken();
    const cookieName=user.role==="admin"? "adminToken":"userToken";
    res.status(statusCode).cookie(cookieName,token,{
        expires: new Date( Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000)
    })
    .json({
        success:true,
        message,
        user,
        token
    })
}
catch (error) {
    console.error('Error generating token or setting cookie:', error); 
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
}
}