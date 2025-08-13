import React, { useState } from "react";
import { fetchWithAuth } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
function CreateNote() {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    text: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.text.trim()) return;

    const newNote = {
      title: note.title,
      date: note.date || new Date().toISOString().split("T")[0],
      text: note.text,
    };

    const response = await fetchWithAuth("http://localhost:5000/note/addnote", {
      method: "POST",
      body: JSON.stringify(newNote),
    });

    // Reset note state
    setNote({
      title: "",
      text: "",
      date: "",
    });
    navigate("/notescontainer");
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div className="p-20 flex flex-col items-center text-center">
            <input
              className="h-20 w-150  text-5xl p-10 "
              name="title"
              value={note.title}
              placeholder="Title"
              onChange={handleChange}
            />

            {/* <label>
            Date :
            <input
              className="h-10 w-50 border-2 text-2xl rounded-xl"
              name="date"
              type="date"
              value={note.date}
              onChange={handleChange}
            />
          </label> */}

            {/* Write note here: */}
            <TextField
              id="standard-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="standard"
              onChange={handleChange}
              value={note.text}
              name="text"
            />
            <textarea
              className="h-200 w-150 text-2xl p-10 "
              name="text"
              value={note.text}
              placeholder="Write here"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="h-10 w-20 bg-black text-white  rounded-2xl"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </Box>
  );
}

export default CreateNote;
