const { server } = require("./app");
require("dotenv").config();
const { PORT } = process.env;
const { dbConnect } = require("./dbConnection");

dbConnect().then(()=>{
   server.listen(PORT, ()=>{
      console.log("Server on port", PORT)
   });
});