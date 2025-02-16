const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const productReview=Schema({
    product_id:{type:Schema.Types.ObjectId,ref:"Product",required:true},
    messages:[{
        user_id:{type:Schema.Types.ObjectId,ref:"User",required:true},
        message:{type:String,required:true}
    }]
})

