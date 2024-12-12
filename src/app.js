const express = require("express");

const app = express();


app.use("/user",(req,res,next)=>{
    //Route Handler 1
    // res.send("Route Handler 1")
    console.log("Handling The Route Users 1");
    next();
    res.send("Responce back first");
    
    

},
(req,res)=>{
    //Route Handler 2
    console.log("Handling The Route Users 2");
    res.send("Responce back second");
}
);

app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000.......");
    
});
