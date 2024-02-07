const moongose = require("mongoose");

const Schema = moongose.Schema;

const NotificationsGame = new Schema (
    {  
       userId: { type: String, required: true },
       userName:{ type: String, required: true },
       userIdInvitation: { type: String, require: true },
       checked: { type: Boolean, required: true }
    },
    {
        timestamps: true, 
        versionKey: false
    }
);

module.exports = moongose.model("NotificationsGame", NotificationsGame);
