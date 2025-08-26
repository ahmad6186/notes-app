const express = require("express");
const cors = require("cors");
const notesRouter = require("./routes/notes.js");
const userrouter = require("./routes/user.js");
const folderrouter = require("./routes/folder.js");

const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
mongoose.connect("mongodb://127.0.0.1:27017/notesdb").then(() => {
  console.log("server connected");
});
app.use("/user", userrouter);
app.use("/note", notesRouter);
app.use("/folder", folderrouter);

app.use(cookieParser());
app.listen(5000, () => {
  console.log("server started");
});
