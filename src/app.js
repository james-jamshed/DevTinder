const express = require("express");
const connectDB =require("./config/database")
const app = express();
const User = require("./models/user")

app.post("/signup",async (req,res)=>{
    const user = new User({
        firstName:"sachin tendilkar",
        lastName: "chutiya",
        emailid: "jamshedalam0823@gmial.com",
        password: "Akib52001@",
        id:"285632189654321.890165",
    });
    try{
        await user.save();
        res.send("User Added succesfully")
    } catch(err){
        res.status(400).send("Error saving the user:+ err.message ");
    }

   

});


connectDB()
.then(()=>{
    console.log("DataBase connection is succesfully.....");
    app.listen(3000,()=>{
        console.log("server is successfully listening on port 3000.......");
        
    });
    

}).catch(err=>{
    console.error("Database connot be  connected....")

});


