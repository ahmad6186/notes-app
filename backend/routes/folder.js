const express = require("express");
const { authenticateUser } = require("../service/auth");
const { addfolder } = require("../controller/folder");
const router = express();

router.post("/addfolder", authenticateUser, addfolder);
module.exports = router;
