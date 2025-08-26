const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "note",
        required: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

// (optional) avoid duplicate notes per folder at the app level
folderSchema.methods.addNotes = function (noteIds = []) {
  const set = new Set(this.notes.map(String));
  noteIds.forEach((id) => set.add(String(id)));
  this.notes = Array.from(set);
  return this.save();
};

const Folder = mongoose.model("folder", folderSchema);
module.exports = Folder;
