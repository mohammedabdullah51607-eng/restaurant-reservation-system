const express = require("express");
const router = express.Router();

const {
    createTable,
    getTables
} = require("../controllers/tableController");

router.post("/", createTable);
router.get("/", getTables);

module.exports = router;