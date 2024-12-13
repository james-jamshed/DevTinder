const express = require("express");

const app = express();
app.get("/getUserData",(rew,res)=>{

    
    throw new Error("gnhbfhrbd")
    

    res.send("User Data Sent")
});

app.use("/",(err,req,res,next)=>{
    if(err){
        //log your error
        res.status(500).send("something went wrong");
    }
});



app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000.......");
    
});
