const Profiles = require("../models/profile");
const Game = require("../models/game");

const postGame = async (req, res) => {
    try {
        const {userId, userIdInvitation} = req.body;
        if(!userId) throw error("Faltan datos necesarios");
        const player1 = await Profiles.findOne({
            userId
        });
        const player2 = await Profiles.findOne({
            userId:userIdInvitation
        });
        const players = [ player1, player2 ];
        return res.status(200).json(players);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const actGame = async (req,res) =>{
    try {
        const { player1, player2, _id } = req.query;
        const playerFind1 = await Profiles.findOne({
          userId : player1  
        })
        const playerFind2 = await Profiles.findOne({
            userId : player2 
        })
        const players = [playerFind1,playerFind2];
        return res.status(200).json(players);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const postInfoGame =  async (req, res) => {
   try {
    const { userId, userIdInvitation, _id} = req.body;
    if(!userId || !userIdInvitation) throw Error("Faltan los ids para los post");
    const res1 = await Profiles.findOne({userId});
    const res2 = await Profiles.findOne({userId:userIdInvitation});
    const player1 = {
        userId: res1.userId,
        userName: res1.userName,
        gameId: _id,
        game:1,
        quantityRes:0
    }
    const player2 = {
        userId: res2.userId,
        userName: res2.userName,
        gameId: _id,
        game:1,
        quantityRes:0
    }
   
        const infoPlayersGame = [ player1, player2 ];
        return res.status(200).json(infoPlayersGame);
    

   } catch (error) {
    return res.status(404).send(error.message);
   }
}

const actQuantityres = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantityRes } = req.body;
        const playerInfo = await Game.findOne({userId:id});
        const result = playerInfo.quantityRes + quantityRes;
        await Game.updateOne(playerInfo,{ quantityRes: result });
        const playerAct = await Game.findOne({userId:id});
        return res.status(200).json(playerAct);
    } catch(error){
        return res.status(404).send(error.message);
    }
}

module.exports = {
    postGame,
    actGame,
    postInfoGame,
    actQuantityres
}