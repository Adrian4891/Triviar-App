const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Friends = new Schema (
    {   
        userName: { type : String, require : true },
        picture: { type : String, require : true },
        friendId : { type : String, require : true},
        userId: { type: String , require : true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Friends", Friends);