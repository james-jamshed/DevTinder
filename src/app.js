const express = require("express");

const app = express();
const {adminAuth ,UserAuth}= require("./middlewares/auth");


app.use("/admin",adminAuth);
app.get("/user",UserAuth,(req,res)=>{
    res.send("User Data Sent");
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
});

app.get("/admin/deleteUser",(req,res)=>{
  
    res.send("Delete a User");
});



app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000.......");
    
});
