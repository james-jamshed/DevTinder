const express = require("express");
const {UserAuth} = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",UserAuth,async (req,res)=>{
 const user = req.user;
    
 console.log("sending a connection Request");
 res.send(user.firstName +"send the connection request")
});


module.exports = requestRouter;