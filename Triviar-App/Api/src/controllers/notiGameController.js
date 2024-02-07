const NotificationsGame = require("../models/notificationsGame");
const Profiles = require("../models/profile");

const postNotiGame = async (req, res) => {
    try {
        const { id } = req.params;
        const friend   = req.body;
        if(!friend) throw Error("faltan datos necesarios");
        const userFind = await Profiles.findOne({
            userId: id
        });
        if(!userFind) throw Error("No se encontro el usuario");
        const notification = {
            userId: userFind.userId,
            userName: userFind.userName,
            userIdInvitation: friend.friendId,
            friendUserName: friend.userName,
            checked: false
        }
        const resNotification = await NotificationsGame.insertMany(notification);
        if(resNotification){
            const notificationsUsers = await NotificationsGame.find()
            return res.status(200).json(notificationsUsers);
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
};

const getNotifications = async (req, res) => {
    try{
       const notifications = await NotificationsGame.find();
       if(!notifications.length) throw Error("No hay notificaciones");
       return res.status(200).json(notifications);
    } catch(error){
       return res.status(404).send(error.message);
    }
};


const checkedNotiGame = async (req, res) => {
    try {
       const { id } = req.params;
       const notification = await NotificationsGame.findById(id);
       notification.checked = true;
       if(!notification) throw error("no se encontro la notificacion");
       const checkNoti = await NotificationsGame.findByIdAndUpdate(id, notification,
          {new: true}
       );
       return res.status(200).json(checkNoti);
    } catch(error){
      return res.status(404).send(error.message);
    }
}

const deleteNotiGame = async (req, res) =>{
    try {
        const { id } = req.params;
        const notification = await NotificationsGame.findById(id);
        const notiDel = await NotificationsGame.deleteMany(notification);
        return res.status(200).send("Notificacion borrada");
    } catch(error){
        return res.status(404).send(error.message);
    }
}

module.exports = {
   postNotiGame,
   getNotifications, 
   checkedNotiGame, 
   deleteNotiGame
}