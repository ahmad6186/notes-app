const Note = require("../models/notes");
const User = require("../models/users");

async function showallnotes(req, res) {
  const allnotes = await Note.find({});
  return res.json(allnotes);
}
async function getNoteById(req, res) {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.json(note);
}
async function addnote(req, res) {
  const body = req.body;
  if (body.title || body.text) {
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
async function editNote(req, res) {
  const { id } = req.params;
  const { title, text, date } = req.body;

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { title, text, date },
    { new: true }
  );

  if (!updatedNote) {
    return res.status(404).json({ error: "Note not found" });
  }

  return res.status(200).json({ status: "success", note: updatedNote });
}
async function deletenote(req, res) {
  await Note.findByIdAndDelete(req.params.id);
  return res.status(201).json({ status: "success" });
}
async function pinNote(req, res) {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (note.pin != true) {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { $set: { pin: true } },
      { new: true }
    );
  } else {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { $set: { pin: false } },
      { new: true }
    );
  }
  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json(updatedUser);
}
async function deletenote(req, res) {
  await Note.findByIdAndDelete(req.params.id);
  return res.status(201).json({ status: "success" });
}
module.exports = {
  showallnotes,
  addnote,
  deletenote,
  getNoteById,
  editNote,
  pinNote,
};
