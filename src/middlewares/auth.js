const adminAuth =  (req,res,next)=>{
    console.log("Admin auth is getting Checked!!!");
    const token ="xyz";
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");

    }
    else{
        next(); 
    }
};
const UserAuth =  (req,res,next)=>{
    console.log(" auth is getting Checked!!!");
    const token ="xyz";
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");

    }
    else{
        next(); 
    }
};
module.exports={
    adminAuth,
    UserAuth
};