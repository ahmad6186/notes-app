const Note = require("../models/notes");
const User = require("../models/users");
const Folder = require("../models/folders");
async function addfolder(req, res) {
  const body = req.body;
  if (body.name) {
    await Folder.create({
      name: body.name,
      notes: null,
      user: req.user.id,
    });
    return res.status(201).json({ status: "success" });
  } else {
    return res.status(400).json("fill the fields");
  }
}
async function showallFolder(req, res) {
  try {
    // req.user.id comes from your authenticateUser middleware
    const allFolders = await Folder.find({ user: req.user.id });
    return res.json(allFolders);
  } catch (err) {
    console.error("showallFolder error:", err);
    return res.status(500).json({ error: "Failed to load folders" });
  }
}
module.exports = {
  addfolder,
  showallFolder,
};
