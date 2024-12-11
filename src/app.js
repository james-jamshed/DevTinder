const express = require("express");

const app = express();


app.get("/ab+c",(req,res)=>{
    res.send({firstName: "jamshed", lastName:"Alam"})
});




app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000.......");
    
});
