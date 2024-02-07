require("dotenv").config()
const mongoose = require("mongoose");
const {MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB} = process.env;

const uriDb = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

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