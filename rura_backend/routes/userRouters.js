const express=require("express")
const {protect,adminOnly,vendorOnly}=require("../middleware/authMiddleware")

const router=express.Router();

// Protected route (logged-in users only)
router.get("/profile",protect,(req,res)=>{
    res.json(req.user)
})


// Admin-only router
router.get("/admin",protect,adminOnly,(req,res)=>{
    res.json(req.user)
});

// Vendor-only router 
router.get("/vendor",protect,vendorOnly,(req,res)=>{
    res.json(req.user)
})


module.exports=router