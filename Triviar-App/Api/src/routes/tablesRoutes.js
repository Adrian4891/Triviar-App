const router = require("express").Router();
const { postTables, getTables, deleteTables, checkedTable } = require("../controllers/tablesController");

router.post("/", postTables);

router.get("/", getTables);

router.delete("/:id", deleteTables);

router.put("/", checkedTable);

module.exports = router;