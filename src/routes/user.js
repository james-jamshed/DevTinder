const express = require('express');
const { UserAuth } = require('../middlewares/auth');
const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const User = require("../models/user");



const USER_SAFE_DATA = "firstName lastName photoUrl gender";

//Get all the pending connection request for the loggedIn User
userRouter.get("/user/requests/received",UserAuth,async(req,res)=>{

    try{
        const logggedInUser = req.user;

        const ConnectionRequest = await connectionRequest.find({
            toUserId: logggedInUser._id,
            status:"interested",
            
        }).populate("fromUserId",USER_SAFE_DATA);




        res.json({message: "Data fetched sucessfully",
            data:ConnectionRequest})

    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
});


userRouter.get("/user/connections",UserAuth,async(req,res)=>{
    try{
        const logggedInUser =req.user;

        const ConnectionRequest = await connectionRequest.find({
            $or:[
                {toUserId: logggedInUser._id, status:"accepted" },
                {fromUserId: logggedInUser._id, status:"accepted" },
            ],
        })
        .populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA);
        const data = ConnectionRequest.map((row) =>{
            if(row.fromUserId._id.toString()== logggedInUser._id){
                return row.toUserId;

            }
            return row.fromUserId;
        });
        res.json({data});

    }
    catch(err){
        res.status(400).send({message: err.message})
    }

});

userRouter.get("/feed", UserAuth, async (req, res) => {
    try {
      const loggedInUser = req.user;
  
      const page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      limit = limit > 50 ? 50 : limit;
      const skip = (page - 1) * limit;
  
      const connectionRequests = await connectionRequest.find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      }).select("fromUserId  toUserId");
  
      const hideUsersFromFeed = new Set();
      connectionRequests.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
      });
  
      const users = await User.find({
        $and: [
          { _id: { $nin: Array.from(hideUsersFromFeed) } },
          { _id: { $ne: loggedInUser._id } },
        ],
      })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);
  
      res.json({ data: users });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = userRouter;
