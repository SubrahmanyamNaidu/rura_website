const express=require("express")
const {protect, vendorOnly } = require("../middleware/authMiddleware")
const Product=require("../models/Product")
const router=express.Router()

router.post("/add/product",protect,vendorOnly,(req,res)=>{
    try{
        const {
            product_name,
            product_price_by_measurements,
            product_discount_by_measurements,
            product_measurement_types,
            product_availability_by_measurement,
            product_description,
            product_image_urls
            }=req.body;
        const vendor_id=req.body._id;
    
        new_product=Product({
            product_name,
            product_price_by_measurements,
            product_discount_by_measurements,
            product_measurement_types,
            product_availability_by_measurement,
            product_description,
            product_image_urls,
            vendor_id
            })
    
        new_product.save();
    
        res.status(201).json({message:`Product ${product_name} added successfully`})
    }catch(error){
        res.status(500).json({message:"internal server error"})
    }


})

module.exports=router;