const { updateOne } = require("../models/profile");
const Table = require("../models/tables");

const postTables = async (req, res) => {
    try{
        const { userId, userName } = req.body;
        if(!userId || !userName) throw Error("Faltan datos necesarios");
        const newTable = {
            userId,
            userName, 
            checked:false
        };
        const response = await Table.insertMany(newTable);
        if(response) return res.status(200).json(response);
    } catch(error){
        return res.status(404).send(error.message); 
    }
};

const getTables = async (req, res) => {
    try{
        const resTables = await Table.find();
        return res.status(200).json(resTables);
    } catch(error){
       return res.status(404).send(error.message);
    }
};

const deleteTables = async (req, res) => {
    try{
       const { id } = req.params;
       const response = await Table.findByIdAndDelete(id);
       if(!response) throw Error("No se encontro la mesa");
       return res.status(200).json(response);
    } catch(error){
       return res.status(404).send(error.message); 
    }
};

const checkedTable = async (req, res) => {
    try{
       const { userId,userIdInvitation } = req.query;
       const findTable = await Table.findOne({userId});
       const response = await Table.updateOne(findTable, {checked:true, userIdInvitation});
       if(response.modifiedCount) {
          const modifiedTable = await Table.findOne({userId});
          return res.status(200).json(modifiedTable);
       }
    } catch(error){
      return res.status(404).send(error.message);
    }
};

module.exports = {
    postTables,
    getTables,
    deleteTables,
    checkedTable
};