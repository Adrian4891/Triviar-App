const moongose = require("mongoose");

const Schema = moongose.Schema;

const Game = new Schema (
    {
       userId: { type: String, required :true },
       userName: { type: String, required: true },
       quantityRes: { type: Number, required: true },
       gameId: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }

);

module.exports = moongose.model("Game", Game);