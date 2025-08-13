import React, { useState } from "react";
import { fetchWithAuth } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="bg-yellow-100 min-h-screen p-20">
          <button
            type="submit"
            className="h-10 w-20 bg-black text-white fixed top-20 right-4 rounded-2xl"
          >
            ADD
          </button>
          <input
            className="h-20 w-full  text-5xl p-10 "
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
          <textarea
            className="h-screen w-full text-2xl p-10 "
            name="text"
            value={note.text}
            placeholder="Write here"
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
