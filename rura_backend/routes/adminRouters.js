const express=require("express")
const {protect,adminOnly,vendorOnly}=require("../middleware/authMiddleware");
const generateToken=require("../utils/jwt")
const User = require("../models/User");
const router=express.Router();

router.post("/vendor/create",protect,adminOnly,async(req,res)=>{
    try{
        const {name,email,password,phoneNumber}=req.body;
        const role="vendor"
    
        let userExists=await User.findOne({email});
        if(userExists) return res.status(400).json({message:"Vendor already exists"})
        
        if(!/^\d{10}$/.test(phoneNumber)) return res.status(400).json({message: "Invalid phone number format"})
        
        const vendor=new User({name,email,password,phoneNumber,role})

        await vendor.save();

        // generateToken(res,vendor)

        res.status(201).json({
            id:vendor._id,
            name:vendor.name,
            email:vendor.email 
        })


    }catch(error){
        res.status(500).json({message: error.message || "Internal Server Error"})
    }
})


module.exports=router