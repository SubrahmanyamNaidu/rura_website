const express=require("express")
const {protect, vendorOnly } = require("../middleware/authMiddleware")
const router=express.Router()

router.post("/create/product",protect,vendorOnly,(req,res)=>{
    const {}=req.body;
})