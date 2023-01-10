const express = require("express")
const app = express()

app.use(express.json())

app.listen(3001,()=>{
    console.log("Server is running on port 3001")

})
module.exports = app;

const mongoose = require("mongoose")
mongoose.set("strictQuery", false);
mongoose.connect(
     "mongodb://127.0.0.1:27017/myapp",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },
    (err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Connected to MongoDB");
        }
    }
)
const blogRouter =require("./routes/BlogRoutes")

app.use("/api/blogs",blogRouter)
