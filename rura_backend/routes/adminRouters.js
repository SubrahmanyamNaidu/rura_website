const express=require("express")
const {protect,adminOnly,vendorOnly}=require("../middleware/authMiddleware");
const generateToken=require("../utils/jwt")
const User = require("../models/User");
const Product=require("../models/Product")
const router=express.Router();

//To create a vendor after manually verifying him/her
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

// to see all the products of a perticular vendor [not fully functional for not]
router.get("/:vendor_id/products",protect,adminOnly,async(req,res)=>{
    try{
        const { vendor_id } = req.params;
        // console.log(vendor_id)
        const vendorProducts=await Product.find({vendor_id});
        // console.log(vendorProducts)
        if(!vendorProducts.length){
            return res.status(404).json({message:"No products found for this vendor"});

        }
        res.status(200).json(vendorProducts);
        
    }catch(error){
        res.status(500).json({message:error.message|| "Internal Server Error"});
    }
});



//to update the status of vendor newly added product to available 
router.post("/:vendor_id/:product_id",protect,adminOnly,async(req,res)=>{
    try{
        const {vendor_id,product_id}=req.params; 
        let product=await Product.findOne({_id: product_id,vendor_id});
        // console.log(product)
        if(!product){
            return res.status(404).json({message:"Product not found for this vendor"})
        }

        // Update the product availability status 
        product.product_availability = "available"

        await product.save()

        res.status(200).json({message:"vendor product status change route is working fine"})
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.message|| "Internal Server Error"})
    }
});


module.exports=router