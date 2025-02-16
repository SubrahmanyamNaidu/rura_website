const jwt=require("jsonwebtoken");
const User=require("../models/User"); 

const protect=async(req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token) return res.status(401).json({message:"Unauthorized, no token"});

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select(["-password","-phoneNumber"]);
        next();
    }catch(error){
        res.status(401).json({message:"Invalid token"})
    }
};


const adminOnly=(req,res,next)=>{
    if(req.user && req.user.role=="admin"){
        next();
    }else{
        res.status(403).json({message:"Access denied, admin only"})
    }
}


const vendorOnly=(req,res,next)=>{
    if(req.user && res.user.role=="vendor"){
        next();
    }else{
        res.status(403).json({message:"Access denied, vendor only"})
    }
}

module.exports={protect,adminOnly,vendorOnly}