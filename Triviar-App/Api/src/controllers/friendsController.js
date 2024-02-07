const Friends = require("../models/friends");

const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const arrFriends = await Friends.find({
            userId: id
        });
        if(!arrFriends.length) throw Error("No tienes amigos aún");
        return res.status(200).json(arrFriends);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const postFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, userName, picture} = req.body;
        if(!userId || !userName || !picture) throw Error(" No se proporciono el id del amigo")
       
        const friend = {
            friendId:userId,
            userId: id,
            userName,
            picture
        }
        const frienRes = await Friends.insertMany(friend);
        return res.status(200).json(frienRes);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const deleteFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.query;
        const friendDel = await Friends.findOneAndDelete({userId, friendId});
        console.log(friendDel);
        return res.status(200).json(friendDel)
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

module.exports = {
    getUserFriends,
    postFriends,
    deleteFriend
}