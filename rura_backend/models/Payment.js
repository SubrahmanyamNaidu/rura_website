// Payment for vendors

const mongoose=require("mongoose"); 
const Schema=mongoose.Schema; 

const paymentSchema=new Schema({
    order_id:{type:Schema.Types.ObjectId,ref:"Order",required:true}, 
    user_id:{type:Schema.Types.ObjectId,ref:"User",required:true},
    payments_per_vendor:[
        {
            vendor_id:{type:Schema.Types.ObjectId,ref:"User",required:true},
            amount_paid:{type:Number,required:true},
            payment_status:{type:String,enum:["Success","Failed","Refunded"],default:"Pending"},
            transaction_id:{type:String,required:true}
        }

    ],
    payment_method:{type:String,enum:["Razorpay","Stripe","Cash on Delivery"],required:true},
    created_at:{type:Date,default:Date.now}
});

const Payment=mongoose.model("Payment",paymentSchema);
model.exports=Payment;