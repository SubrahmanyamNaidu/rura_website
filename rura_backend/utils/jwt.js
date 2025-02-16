const jwt=require("jsonwebtoken");
const generateToken=(res,user)=>{
    const token= jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )
    res.cookie("jwt",token,{
        httpOnly:true, 
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict", 
        maxAge: 7*24*60*60*1000, // 7 days  

    });

}

module.exports=generateToken