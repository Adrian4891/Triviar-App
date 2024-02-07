const Profiles = require("../models/profile");

const postProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const {userName, picture, country, birthday} = req.body;
        if(!country|| !userName || !picture || !birthday ) throw Error("Faltan datos necesarios");
        const userNameCheck = await Profiles.findOne({userName});
        if(userNameCheck !== null) throw Error("El userName esta en uso");
        const newProfile = {
            userName,
            picture,
            birthday,
            country,
            userId:id,
            points: 0,
        };
        const upProfile = await Profiles.insertMany(newProfile);
        return res.status(200).json(upProfile);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profiles.find();
        if(!profiles.length) throw error("No se cargaron los perfiles");
        return res.status(200).json(profiles);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        //if(!id) throw Error("No hay id");
        const profileFind = await Profiles.find({userId: id});
        if(!profileFind) throw Error("El perfil no se encontro");
        return res.status(200).json(profileFind);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const editProfile = async (req, res) => {
    try {
        const  { id } = req.params;
        const  dataProfile  = req.body;
        if(!dataProfile) throw Error("Faltan datos necesarios");
        const profileEdit = await Profiles.findByIdAndUpdate(id, dataProfile,
            { new : true }
        );
        return res.status(200).json(profileEdit);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const sumPointsUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const userProfile = await Profiles.findOne({
            userId: id
        });
        const result = userProfile.points + 10;
        await Profiles.updateOne(userProfile, {points: result});
        const profileModif = await Profiles.findOne({userId:id});
        return res.status(200).json(profileModif);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const searchProfile = async (req, res) => {
    try {
        const { userName } = req.query;
        const profile = await Profiles.find({
        "userName": new RegExp(userName, 'i')});
        if(!profile) throw Error("El perfil no se encontro");
        return res.status(200).json(profile);
    } catch (error) {
        return res.status(404).json(error.message);
    }
}
 
module.exports = {
    postProfile, 
    getProfiles,
    getProfileById,
    editProfile,
    sumPointsUsers,
    searchProfile
}