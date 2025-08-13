import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    text: "",
    date: "",
  });

  // Fetch note data when component mounts
  useEffect(() => {
    console.log("fetching note");
    const fetchNote = async () => {
      const data = await fetchWithAuth(`http://localhost:5000/note/${id}`, {
        method: "GET",
      });
      console.log(data);
      setNote({
        title: data.title || "",
        text: data.text || "",
        date: data.date?.split("T")[0] || "",
      });
    };

    if (id) fetchNote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("note");
    if (!note.title.trim() || !note.text.trim()) return;

    const response = await fetchWithAuth(`http://localhost:5000/note/${id}`, {
      method: "PUT",
      body: JSON.stringify(note),
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
          <div className="addnotespage">
            <label>
              Title:
              <input
                className="h-10 w-50 border-2 text-2xl rounded-xl"
                name="title"
                value={note.title}
                onChange={handleChange}
              />
            </label>
            <label>
              Date:
              <input
                className="h-10 w-50 border-2 text-2xl rounded-xl"
                name="date"
                type="date"
                value={note.date}
                onChange={handleChange}
              />
            </label>
            <label>
              <textarea
                className="border-2 text-2xl h-100 w-80 rounded-xl"
                name="text"
                value={note.text}
                placeholder="Type something..."
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Box>
  );
}

export default EditNote;
