const express = require("express");
const {UserAuth} = require("../middlewares/auth");
const profileRouter = express.Router();
const {validateProfileEditData} = require("../utils/validation");


profileRouter.get("/profile/view",UserAuth,async(req,res)=>{
    try{
     const user = req.user;
     res.send(user);
    }catch(err){
     res.status(400).send("Something went wrong")
    }
 
 });

profileRouter.patch("/profile/edit", UserAuth,async (req,res)=>{
    try{
       if(!validateProfileEditData(req)){
        throw new Error("Invalid Edit Request");
        
       }

       const user = req.user;
       

       Object.keys(req.body).forEach((key)=> (user[key] = req.body[key]));
       await user.save();
      
       res.json
       ({
        message:`${user.firstName},your profile is updated succesfully`,
        data: user,

       });

       
       
    }
    catch(err){
        res.status(400).send("ERROR :" + err.message);
       }
        

});

 module.exports = profileRouter;