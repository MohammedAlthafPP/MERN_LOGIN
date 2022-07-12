const express = require ('express')
const cors = require ("cors")
const mongoose = require("mongoose")
const  authRoutes = require("./Routes/AuthRoutes")
require('dotenv').config()
const app = express()
const cookieParser = require ("cookie-parser")
app.listen(4000,()=>{
    console.log("Server Running on PORT 4000")
})


mongoose.connect("mongodb://localhost:27017/jwt",{
    useNewurlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB Connection Sucessful");
}) .catch(err=>{
    console.log(err.message);
    console.log("DB connection Failed");
})


app.use(
    cors({
        origin: ["http://localhost:3000"],
        method : ["GET","POST"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use("/",authRoutes)