const express = require("express");

const app = express();

app.use("/user",(req,res)=>{
    res.send("hahahhahahahhaha");
});


//This will only Handle GET call to /USER

app.get("/user",(req,res)=>{
    res.send({firstName: "jamshed", lastName:"Alam"})
});


app.post("/user",(req,res)=>{
    //saving data to db
    res.send("data sussesfully save to database");
    
});

app.delete("/user",(req,res)=>{
    res.send("delete the data from the database")
})

//This will match all the HTTP method API call to /test
app.use("/test",(req,res)=>{
    res.send("hello from the server");

});




app.listen(3000,()=>{
    console.log("server is successfully listening on port 3000.......");
    
});
