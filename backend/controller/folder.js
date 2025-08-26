const Note = require("../models/notes");
const User = require("../models/users");
const Folder = require("../models/folders");
async function addfolder(req, res) {
  const body = req.body;
  if (body.title) {
    await Note.create({
      title: body.title,
      date: body.date,
      text: body.text,
      user: req.user.id,
    });
    return res.status(201).json({ status: "success" });
  } else {
    return res.status(400).json("fill the fields");
  }
}
module.exports = {
  addfolder,
};
