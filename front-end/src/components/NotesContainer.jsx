import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils";
function NotesContainer() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const loggedInUserId = sessionStorage.getItem("userId");
  useEffect(() => {
    fetchWithAuth("http://localhost:5000/note").then((data) => {
      setNotes(data);
    });
  }, []);

  const handleDelete = async (id) => {
    await fetchWithAuth(`http://localhost:5000/note/${id}`, {
      method: "DELETE",
    });
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
  };

  return (
    <div className="sm:grid sm:grid-cols-3 md:grig-cols-2">
      {notes
        .filter((note) => note.user === loggedInUserId)

        .map((note) => (
          <div
            key={note._id}
            className="bg-gray-300  border-black border-2 m-4 rounded-xl relative min-h-30 sm:min-h-40 shadow-xl "
          >
            <h1 className="font-bold text-xl">Title : {note.title}</h1>
            <p className="text-xl">
              {note.index}-{note.text}{" "}
            </p>
            <button
              // className="bg-black text-white rounded-xl w-14 absolute top-2 right-2  hover:bg-blue-600"
              onClick={() => handleDelete(note._id)}
            >
              <img
                src="/delete button.png"
                alt="delete Button"
                className="w-8 h-8 rounded-full hover:opacity-80 transition absolute top-2 right-2"
              />
            </button>
            <button
              // className="bg-black text-white rounded-xl  w-14 absolute bottom-2 right-2 hover:bg-blue-600  "
              onClick={() => {
                navigate(`/edit/${note._id}`);
              }}
            >
              <img
                src="/edit-button.png"
                alt="Edit Button"
                className="w-8 h-8 rounded-full hover:opacity-80 transition absolute bottom-2 right-2"
              />
            </button>
          </div>
        ))}
    </div>
  );
}

export default NotesContainer;
