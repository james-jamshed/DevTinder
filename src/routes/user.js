const express = require('express');
const { UserAuth } = require('../middlewares/auth');
const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

//Get all the pending connection request for the loggedIn User
userRouter.get("/user/requests/received",UserAuth,async(req,res)=>{

    try{
        const logggedInUser = req.user;

        const ConnectionRequest = await connectionRequest.find({
            toUserId: logggedInUser._id,
            status:"interested",
            
        }).populate("fromUserId",["firstName", "lastName","photoUrl"]);




        res.json({message: "Data fetched sucessfully",
            data:ConnectionRequest})

    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
});


module.exports = userRouter;
