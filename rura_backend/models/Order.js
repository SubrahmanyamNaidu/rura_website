const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const orderSchema=new Schema({
    user_id:{type:Schema.Types.ObjectId,ref:"User",required:true},
    products:[{
        product_id:{type:Schema.Types.ObjectId,ref:"Product",required:true},
        vendor_id:{type:Schema.Types.ObjectId,ref:"User",required:true},
        measurement_type:{type:String,required:true},
        quantity:{type:Number,required:true},
        price:{type:Number,required:true},
        discount:{type:Number,default:0},
        final_price:{type:Number,required:true}
    }],
    order_total:{type:Number,required:true}, //Sum of all products totals
    payment_status:{type:String,enum:["Pending","Paid","Failed","Refunded"],default:"Pending"},
    delivery_address:{type:String,required:true},
    created_at:{type:Date,default:Date.now}

})

const Order=mongoose.model("Order",orderSchema);
model.export=Order;