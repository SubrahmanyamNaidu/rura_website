const express=require("express")
const User=require("../models/User")
const generateToken=require("../utils/jwt")
const {protect}=require("../middleware/authMiddleware");
const router=express.Router();

// User Registration 
router.post("/register",async(req,res)=>{
    try{
        const {name,email,password,phoneNumber}=req.body;
        // console.log(name)
        
        let userExists=await User.findOne({email});
        if(userExists) return res.status(400).json({message:"User already exists"});
        if(phoneNumber.length!=10)  return res.status(400).json({message:"Not a valid Phone number"})  
        const user=new User({name,email,password,phoneNumber})
        // console.log(user)
        await user.save();

        generateToken(res,user)
        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email, 
        });
    }catch(error){
        // console.log(error)
        res.status(500).json({message: error.message || "Internal Server Error"});
    }
});


router.post("/login",async(req,res)=>{
    try{
     
        const {email,password}=req.body; 
        const user=await User.findOne({email})

        if(!user) return res.status(400).json({message:"Invalid credentials"});

        const isMatch=await user.comparePassword(password); 

        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        generateToken(res,user); // Store JWT in cookie 

        res.json({
            id:user._id,
            name:user.name,
            email:user.email,
        });
    }catch(error){
        res.status(500).json({message:"Server error"})
    }

});

// Logout (Clear Cookie)

router.post("/logout",(req,res)=>{
    res.cookie("jwt","",{httpOnly:true, expires:new Date(0)});
    res.json({message:"Logged out"});
});

router.get("/user",protect,(req,res)=>{
    res.json(req.user)
})

module.exports=router;