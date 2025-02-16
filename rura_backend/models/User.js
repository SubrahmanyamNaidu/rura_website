const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true}, 
    password:{type:String,required:true}, 
    phoneNumber:{type:String,required:true},
    countryCode:{type:String,required:true},
    role:{type:String, enum:["admin","customer","vendor"],default:"customer"},
    },
    {timestamps:true}
);

// Hash password before saving 

UserSchema.pre('save',async function(next){
    if(!this.isModified("password"))return next();

    
    this.password=await bcrypt.hash(this.password,10);
    next();
});


// Compare password for login 

UserSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);

}

const User=mongoose.model("User",UserSchema);

module.exports=User;