const router = require("express").Router();
const getAnswersApi = require("../controllers/answersControllers")

router.get("/", getAnswersApi);

module.exports = router;