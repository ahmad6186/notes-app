const mongoose = require("mongoose");
const noteschema = new mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: Date,
  },
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // name of the model you're referencing
    required: true,
  },
});
const Note = mongoose.model("note", noteschema);
module.exports = Note;
