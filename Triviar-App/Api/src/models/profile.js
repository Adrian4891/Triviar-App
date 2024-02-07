const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Profiles = new Schema(
    {    
        userId: { type: String , required: true },
        userName: { type: String, required: true },
        picture: { type: String, required: true },
        country: { type: String, required:true },
        birthday: { type: String, required:true },
        points : { type: Number }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Profiles", Profiles);