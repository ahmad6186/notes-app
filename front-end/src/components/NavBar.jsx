import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="bg-gray-600 font-bold text-xl  min-h-15 justify-center flex items-center gap-1">
        <Link to="/notescontainer">
          <button className="btn">NOTES</button>
        </Link>
        <Link to="/createnote">
          <button className="btn">ADD NOTES</button>
        </Link>
        NOTES APP
      </nav>
    </>
  );
}

export default NavBar;
