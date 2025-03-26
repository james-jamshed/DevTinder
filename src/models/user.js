const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema =new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true,
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
        default: "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
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

userSchema.index({firstName:1});
userSchema.index({gender:1});

userSchema.methods.getJWT = async function(){
    const user =this;
     const token = await jwt.sign({_id: user._id},"DEV@Tinder$790",
        {expiresIn:"7d",
    
    });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;

    const passwordHash = user.password;

    const ispasswordValid = await  bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return ispasswordValid;
}

const User = mongoose.model("user",userSchema);

module.exports = User; 