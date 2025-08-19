import { useState } from "react";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import CreateNoteDialogue from "./addNoteModal";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [openModal, setOpenModal] = useState(false);
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null); // ✅ null, not "null"
  const navigate = useNavigate();
  const loggedInUserId = sessionStorage.getItem("userId");

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logout = async (id) => {
    try {
      await fetch(`http://localhost:5000/user/logout/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      setAnchorEl(null);
      sessionStorage.removeItem("userId");

      navigate("/");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NOTES APP
          </Typography>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenModal(true)}
          >
            Add A Note
          </Button>

          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Cancel</MenuItem>
                {/* ✅ pass a function, don't call logout immediately */}
                <MenuItem onClick={() => logout(loggedInUserId)}>
                  Log out
                </MenuItem>
              </Menu>
            </div>
          )}

          <CreateNoteDialogue open={openModal} setOpen={setOpenModal} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
