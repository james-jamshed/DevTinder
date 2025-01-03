const jwt= require("jsonwebtoken");
const User = require("../models/user");

const UserAuth =  async (req,res,next)=>{
   
 try{   const {token} = req.cookies;

 if(!token){
    throw new Error("token is not valid!!!!!!!!!!!");
    
 }

    const decodedobj = await jwt.verify(token,"DEV@Tinder$790");
    const {_id} = decodedobj;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("User Not Found");
        
    }
    req.user =user;
    next();
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }

  
};
module.exports={
    UserAuth
};