
const mongoose = require("mongoose");
const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://james_jamshed:Liso62CQKWGj4xZe@devtinder.nkbwg.mongodb.net/devTinder",
        {
            useNewUrlParser: true,
                useUnifiedTopology: true
        }
    );
};
module.exports =connectDB;

