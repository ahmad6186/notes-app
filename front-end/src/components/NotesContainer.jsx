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
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
  ];
  const getColorFromId = (id) => {
    if (!id) return colors[0];
    let hash = 7;
    for (let i = 0; i < id.length; i++) {
      hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    }
    return colors[hash % colors.length];
  };
  return (
    <div className="grid sm:grid sm:grid-cols-3 md:grid-cols-3 lg:grid-col-2 bg-gray-200 h-max">
      {notes
        .filter((note) => note.user === loggedInUserId)

        .map((note) => (
          <div
            key={note._id}
            // className="bg-gray-300  border-black border-2 m-4 rounded-xl relative min-h-30 sm:min-h-40 shadow-xl "
            className="bg-white  border-black mx-3  my-2 whitespace-pre-wrap break-words overflow-hidden rounded-bl-xl  relative  shadow-xl  hover:bg-"
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
            <h6 className="transition absolute bottom-2 left-2">{note.date}</h6>
          </div>
        ))}
    </div>
  );
}

export default NotesContainer;
