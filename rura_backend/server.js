const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const mongoose=require("mongoose")

dotenv.config()

const app=express();

app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json());
app.use(cookieParser());

const authRouters=require("./routes/authRouters")
const userRouters=require("./routes/userRouters")
const vendorRouters=require("./routes/vendorRouters")
const adminRouters=require("./routes/adminRouters")
const productRouters=require("./routes/productRouters")

app.use("/api/auth",authRouters)
app.use("/api/user",userRouters)
app.use("/api/vendor",vendorRouters)
app.use("/api/admin",adminRouters)
app.use("/api/products",productRouters)


mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(5000,()=>console.log("Server is running on port 5000"))
}).catch(err=>console.log(err));