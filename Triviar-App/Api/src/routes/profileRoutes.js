const router = require("express").Router();
const { 
    postProfile, 
    getProfiles, 
    getProfileById, 
    editProfile, 
    sumPointsUsers,
    searchProfile,
    actDataPlayer
} = require("../controllers/profileControllers");

router.post("/:id", postProfile);

router.get("/search", searchProfile);



router.get("/", getProfiles);

router.get("/:id", getProfileById);

router.put("/points/:id", sumPointsUsers);

//router.put("/:id", editProfile);

module.exports = router;