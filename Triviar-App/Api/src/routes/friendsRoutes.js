const { Router } = require("express")
const router = Router();
const { getUserFriends, postFriends, deleteFriend } = require("../controllers/friendsController");

router.get("/:id", getUserFriends);

router.post("/:id", postFriends);

router.delete("/", deleteFriend);

module.exports = router;