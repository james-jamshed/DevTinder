const express = require("express");
const connectDB =require("./config/database")
const app = express();
const User = require("./models/user")
const { validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

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
        const ispasswordValid =await bcrypt.compare(password,user.password);
        if(ispasswordValid){
          res.send("Login Successfull!!!!");  
        }
        else{
            throw new Error("Invalid Credentials");
            
        }

    }catch (err){
        res.status(400).send("ERROR:" +err.message);
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
app.patch("/user/:userId",async(req,res)=>{
    const userId= req.params?.userId;

    const data = req.body;
    
    try{
        const ALLOWED_UPDATES =[
            "photoUrl","about","gender","age","skills"
        ];
        const isUpdateAllowed= Object.keys(data).every(k =>
            ALLOWED_UPDATES.includes(k)
        )
        // if(!isUpdateAllowed){
        //     throw new Error("Update Not Allowed");
               
        // }
        if(data?.skills.length > 5){
            throw new Error("skills not more than 5");
            
        }
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
