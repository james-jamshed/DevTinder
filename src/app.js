const express = require("express");
const connectDB =require("./config/database")
const app = express();

connectDB()
.then(()=>{
    console.log("DataBase connection is succesfully.....");
    app.listen(3000,()=>{
        console.log("server is successfully listening on port 3000.......");
        
    });
    

}).catch(err=>{
    console.error("Database connot be  connected....")

});


