const express = require("express");
const connectDB =require("./config/database")
const app = express();
const User = require("./models/user")
const { validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {UserAuth} = require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async (req,res)=>{
    //Validation of data
    try{
        validateSignUpData(req);
     //Encrypt the password
     const {firstName,lastName,emailId,password} = req.body;

     const passwordHash =await bcrypt.hash(password,10);
     //creating a new instance of the user model
     const user = new User ({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
     });
    
        await user.save();
        res.send("User Added succesfully")
    } catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }

   
 
});

app.post("/login",async(req,res)=>{
    try{
        const{emailId,password} = req.body;
        const user =await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");       
        }
        const ispasswordValid =await user.validatePassword(password)
        if(ispasswordValid){
            const token = await user.getJWT();
            res.cookie("token",token,{expires:new Date(Date.now() + 8* 360000),
            });
            res.send("Login Successfull!!!!");  
        }
        else{
            throw new Error("password not valid ");
            
        }

    }catch (err){
        res.status(400).send("ERROR:" +err.message);
    }

});

app.get("/profile",UserAuth,async(req,res)=>{
   try{
    const user = req.user;
    res.send(user);
   }catch(err){
    res.status(400).send("Something went wrong")
   }

});

app.post("/sendConnectionRequest",UserAuth,async (req,res)=>{
    const user = req.user;
    
console.log("sending a connection Request");
res.send(user.firstName+"send the connection request")





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
