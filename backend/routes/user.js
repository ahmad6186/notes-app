const express = require("express");
const {
  handleLogin,
  handleSignup,
  handleLogout,
} = require("../controller/user");
const router = express.Router();
router.post("/", handleSignup);
router.post("/login", handleLogin);
router.delete("/logout/:id", handleLogout);
module.exports = router;
