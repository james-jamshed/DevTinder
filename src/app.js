const express = require("express");
const connectDB =require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json());

app.post("/signup",async (req,res)=>{
    //creating a new instance of the user model
    const user = new User (req.body);
    try{
        await user.save();
        res.send("User Added succesfully")
    } catch(err){
        res.status(400).send("Error saving the user:"+err.message);
    }

   

});

//Get user by email

app.get("/user",async (req,res)=>{
    const useremail = req.body.emailid;

   try{
     const users = await  User.find({emailid: useremail});
     if(users.length ===0){
        res.send(404).send("User not Wrong")
     }
     else{
        res.send(users);

     }

   }
   catch(err){
    res.status(400).send("Something went wrong")
   }

});

//Feed API -GET all the users from the database
app.get("/feed",async (req,res)=>{

    try{
        const users = await User.find({});
        res.send(users);

    }
    catch(err){
        res.status(400).send("Something went wrong")
       }
    
});
//Delete a user from database

app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleteed sussessfully");

    }
    catch(err){
        res.status(400).send("Something Went Wrong");
    }
});

//updata data of the user
app.patch("/user",async(req,res)=>{
    const userId= req.body.userId;

    const data = req.body;
    try{
        await User.findByIdAndUpdate({_id: userId},data);
        res.send("user updated sucessfully");

    }
    catch(err){
        res.status(400).send("Something Went Wrong");
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
