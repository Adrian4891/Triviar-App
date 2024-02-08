require("dotenv").config()
const mongoose = require("mongoose");
const {MONGODB_URL} = process.env;

const uriDb = MONGODB_URL;

const dbConnect = async () => {
    try {
        await mongoose.connect(uriDb,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }
        );
        console.log("Db, connect")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
   dbConnect
}