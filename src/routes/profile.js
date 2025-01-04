const express = require("express");
const {UserAuth} = require("../middlewares/auth");
const profileRouter = express.Router();

profileRouter.get("/profile",UserAuth,async(req,res)=>{
    try{
     const user = req.user;
     res.send(user);
    }catch(err){
     res.status(400).send("Something went wrong")
    }
 
 });

 module.exports = profileRouter;