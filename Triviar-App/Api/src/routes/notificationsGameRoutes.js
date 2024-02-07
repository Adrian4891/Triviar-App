const router = require("express").Router();
const { postNotiGame, getNotifications, checkedNotiGame, deleteNotiGame } = require("../controllers/notiGameController");
 
router.post("/:id", postNotiGame);

router.get("/", getNotifications);

router.put("/:id", checkedNotiGame);

router.delete("/:id", deleteNotiGame);

module.exports = router;