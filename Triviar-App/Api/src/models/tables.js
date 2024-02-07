const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Table = new Schema(
    {
        userId: { type: String, required:true },
        userName: { type: String, required:true },
        userIdInvitation: { type: String, required:false },
        checked: { type: Boolean, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Table", Table);