const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const morgan = require('morgan');
const friendsRouter = require("./routes/friendsRoutes");
const gameRouter = require("./routes/gameRoutes");
const profileRouter = require("./routes/profileRoutes");
const answersRouter = require("./routes/answersRoutes");
const notiGameRouter = require("./routes/notificationsGameRoutes");
const tablesRouter = require("./routes/tablesRoutes");
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin:"*"
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

let arrUsers = [];
    
const addUser = (profile) => {
  !arrUsers.some((user)=>user.userId === profile.userId) &&
  arrUsers.push(profile);
  console.log(arrUsers)

}

const removeUser = (socketId) => {
  return arrUsers = arrUsers.filter(user=> user.socketId !== socketId)  
}
io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  socket.on('msg', (msg) => { 
    socket.broadcast.emit("msg", msg)
  });

  socket.on("players", (players) => {
    socket.broadcast.emit("players", players);
  });

  socket.on("index", (index) => {
    console.log(index)
    socket.broadcast.emit("index", index);
  });
  
  socket.on("data", (data)=> {
    socket.broadcast.emit("data", data);
  });

  socket.on("infoGame", (infoGame) => {
    socket.broadcast.emit("infoGame", infoGame);
  });

  socket.on("profile", (profile)=>{
    socket.broadcast.emit("profile", profile);
  });
  
  socket.on("name", (name)=>{
    socket.broadcast.emit("name", name);
  });

  socket.on("activeInp", (activeInp)=>{
    socket.broadcast.emit("activeInp", activeInp);
  });
  socket.on("userMsg",(userMsg)=>{
    socket.broadcast.emit("userMsg", userMsg);
  });

  socket.on("messagePriv",(messagePriv)=>{
    socket.broadcast.emit("messagePriv", messagePriv);
  });

  socket.on("userSend",(userSend)=>{
    socket.broadcast.emit("userSend", userSend);
  });

  socket.on("questions",(questions)=>{
    socket.broadcast.emit("questions",questions);
  });

  
  socket.on("join",(profile)=>{
    profile.socketId = socket.id;
    addUser(profile);
    io.emit("getUsers", arrUsers);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
    removeUser(socket.id);
    io.emit("getUsers", arrUsers);
  });
});


app.use("/friends", friendsRouter);
app.use("/game", gameRouter);
app.use("/profile", profileRouter);
app.use("/answers", answersRouter);
app.use("/notificationsGame", notiGameRouter);
app.use("/tables", tablesRouter);

module.exports = {
  server
};
