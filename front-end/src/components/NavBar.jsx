import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Add, List } from "@mui/icons-material";
import CreateNoteDialogue from "./addNoteModal";

function NavBar() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <nav className="bg-gray-600 font-bold text-xl  min-h-15 justify-center flex items-center gap-1">
        <Link to="/notescontainer">
          <Button
            className="font-bold"
            variant="contained"
            startIcon={<List />}
          >
            NOTES
          </Button>
        </Link>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add A Note
        </Button>
      </nav>
      <CreateNoteDialogue open={openModal} setOpen={setOpenModal} />
    </>
  );
}

export default NavBar;
