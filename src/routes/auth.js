const express = require("express");
const { validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
    
    try{
        validateSignUpData(req);
     //Encrypt the password
     const {firstName,lastName,emailId,password,age,skills} = req.body;

     const passwordHash =await bcrypt.hash(password,10);
     //creating a new instance of the user model
     const user = new User ({
        firstName,
        lastName,
         emailId,
         age,
         skills,
        password:passwordHash,
     });
    
        const savedUser = await user.save();
        const token = await savedUser.getJWT();
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });
        res.json({ message: "User Added succesfully!", data: savedUser });
    } catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }

   
 
});

authRouter.post("/login",async(req,res)=>{
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
            res.cookie("token",token,{expires:new Date(Date.now() + 8* 360000),
            });
            res.send(user);  
        }
        else{
            throw new Error("password not valid ");
            
        }

    }catch (err){
        res.status(400).send("ERROR:" +err.message);
    }

});

authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),

    });
    res.send("Logout Successfull!!!!");

});


module.exports = authRouter;