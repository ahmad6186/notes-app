import React, { useState } from "react";
import { fetchWithAuth } from "../utils";
function CreateNote() {
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="addnotespage">
          <label>
            Title :z
            <input
              className="h-10 w-50 border-2 text-2xl rounded-xl"
              name="title"
              value={note.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Date :
            <input
              className="h-10 w-50 border-2 text-2xl rounded-xl"
              name="date"
              type="date"
              value={note.date}
              onChange={handleChange}
            />
          </label>
          <label>
            {/* Write note here: */}
            <textarea
              className="border-2 text-2xl h-100 w-80 rounded-xl"
              name="text"
              value={note.text}
              placeholder="Type something..."
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
