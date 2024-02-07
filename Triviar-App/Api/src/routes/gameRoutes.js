const router = require("express").Router();
const { postGame, actGame, postInfoGame, actQuantityres } = require("../controllers/gameControllers");

router.get("/act", actGame);

router.post("/", postGame);

router.post("/infoGame", postInfoGame);

router.put("/infoGame/:id", actQuantityres);

module.exports = router;