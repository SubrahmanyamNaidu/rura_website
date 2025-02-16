const mongoose=require("mongoose")
const Schema=mongoose.Schema; 

const productSchema=new Schema({
    product_name:{type:String,required:true},

    product_price_by_measurements:{type:Map,of:Number,required:true}, // [['kg',100],['500gms',45]]

    product_discount_by_measurements:{type:Map,of:Number,default:0}, //[['kg',10],['500gms',4]]

    product_measurement_types:{type:[String],required:true},  //['kg','gm','lit']

    product_availability_by_measurement:{type:Map,of:Number,required:true}, //Stock available

    product_description:{type:String, require:true},

    product_image_urls:{type:[String],required:true},

    vendor_id:{type:Schema.Types.ObjectId,ref:'User',required:true},  // product owner id

},{timestamps:true})


const Product=mongoose.model('Product',productSchema);