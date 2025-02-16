const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const deliverySchema=new Schema({
    order_id:{type:Schema.Types.ObjectId,ref:"Order",required:true}, 
    vendor_id:{type:Schema.Types.ObjectId,ref:"User",required:true},
    delivery_partner_id:{type:Schema.Types.ObjectId,ref:"User",required:false},
    delivery_status:{
        type:String,
        enum:["Pending","Shipped","Out for Delivery","Delivered","Canceled"],
        default:"Pending"
    },
    tracking_id:{type:String,required:false},
    delivery_address:{type:String,required:true},
    expected_delivery_date:{type:Date,required:false},
    actual_delivery_date:{type:Date,required:false},
    delivery_notes:{types:String,required:false}, // Any additional information
    created_at:{type:Date,default:Date.now}
});

const Delivery=mongoose.model("Delivery",deliverySchema)
module.exports=Delivery;