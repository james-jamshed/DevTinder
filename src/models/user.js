const mongoose = require("mongoose");
const validator = require("validator");

const userSchema =new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:4,
        maxLength:50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address" + value);
            }
        }
    },
    password:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("enter a strong password" + value);
            }
        }
        
    },
    age:{
        type: Number,
        min: 18,
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not  valid");
            }
        }
    },
    photoUrl:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Email Address" + value);
            }
        }
    },
    about:{
        type: String,
        default: "this is a default about of the user!",

    },
    skills:{
        type: [String],
        minLength: 2,

    },
   
},
 {
        timestamps:true,
    },
);

const User = mongoose.model("user",userSchema);

module.exports = User; 