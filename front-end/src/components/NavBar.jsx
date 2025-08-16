import { useState } from "react";
import Button from "@mui/material/Button";
import { Add, List } from "@mui/icons-material";
import CreateNoteDialogue from "./addNoteModal";

function NavBar() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <nav className="bg-gray-600 font-bold text-white text-xl  min-h-15 justify-center flex items-center gap-1">
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add A Note
        </Button>
        NOTES APP
      </nav>
      <CreateNoteDialogue open={openModal} setOpen={setOpenModal} />
    </>
  );
}

export default NavBar;
