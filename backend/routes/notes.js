const express = require("express");
const {
  addnote,
  showallnotes,
  deletenote,
  getNoteById,
  editNote,
  pinNote,
} = require("../controller/notes");

const { authenticateUser } = require("../service/auth");
const router = express();

router.get("/", authenticateUser, showallnotes);
router.get("/:id", authenticateUser, getNoteById);
router.post("/addnote", authenticateUser, addnote);
router.delete("/:id", authenticateUser, deletenote);
router.put("/:id", authenticateUser, editNote);
router.put("/pin/:id", authenticateUser, pinNote);

module.exports = router;
