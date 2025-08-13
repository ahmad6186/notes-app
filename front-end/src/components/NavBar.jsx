import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Add, List } from "@mui/icons-material";

function NavBar() {
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
        <Link to="/createnote">
          <Button variant="contained" startIcon={<Add />}>
            Add A Note
          </Button>
        </Link>
      </nav>
    </>
  );
}

export default NavBar;
