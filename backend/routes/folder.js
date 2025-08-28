const express = require("express");
const { authenticateUser } = require("../service/auth");
const { addfolder, showallFolder } = require("../controller/folder");
const router = express();

router.post("/addfolder", authenticateUser, addfolder);
router.get("/showallfolders", authenticateUser, showallFolder);
module.exports = router;
