const mongoose = require('mongoose');

const connectionrequestSchema = new mongoose.Schema({
    
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`

        }
    },
},{
    timestamps: true
});

//
connectionrequestSchema.index({fromUserId: 1, toUserId:1});


connectionrequestSchema.pre("save",function(next){
    const connectionRequest = this;
    //check if the fromUserId is same as toUserId

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot Send Connection request yo yourself");
        
    }
    next();

});
const connectionrequestModel = new mongoose.model(
    "connectioRequest",
    connectionrequestSchema,
);

module.exports = connectionrequestModel;