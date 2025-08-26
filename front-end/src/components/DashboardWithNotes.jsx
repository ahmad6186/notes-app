// DashboardWithNotes.jsx
import * as React from "react";
import { createTheme, useColorScheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteIcon from "@mui/icons-material/Note";
import { Add } from "@mui/icons-material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";

import NotesContainer from "./NotesContainer";
import CreateNoteDialogue from "./addNoteModal";

// 🔵 Blue navbar via palette.primary
const themeBase = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: {
      main: "#1976d2", // Material blue (you can change shade if you want)
    },
  },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

/** Top-right toolbar actions: Dark mode toggle + Add Note + Logout */
function TopActions() {
  const navigate = useNavigate();
  const { mode, setMode } = useColorScheme();
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const loggedInUserId = sessionStorage.getItem("userId");

  const toggleMode = () => setMode(mode === "dark" ? "light" : "dark");

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
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
      sessionStorage.removeItem("sessionId");
      sessionStorage.removeItem("sessionExpiry");
      sessionStorage.removeItem("userId");
      navigate("/");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ mr: 1 }}
        onClick={() => setOpenModal(true)}
      >
        Add A Note
      </Button>

      <Button variant="contained" onClick={handleMenu}>
        LOG OUT
      </Button>

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
        <MenuItem onClick={() => logout(loggedInUserId)}>Log out</MenuItem>
      </Menu>

      <Tooltip
        title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        <IconButton onClick={toggleMode} sx={{ mr: 1 }} color="inherit">
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>

      <CreateNoteDialogue open={openModal} setOpen={setOpenModal} />
    </>
  );
}

export default function DashboardWithNotes() {
  return (
    <AppProvider
      navigation={[
        {
          segment: "notes",
          title: "Notes",
          icon: <NoteIcon />,
          children: [
            { segment: "all", title: "All Notes", icon: <DescriptionIcon /> },
            { segment: "pinned", title: "Pinned", icon: <DescriptionIcon /> },
          ],
        },
      ]}
      theme={themeBase}
      branding={{
        title: "NOTES APP",
        logo: (
          <Avatar
            src="/notes-logo.png"
            alt="NOTES APP"
            sx={{ width: 28, height: 28 }}
          />
        ),
      }}
    >
      <DashboardLayout slots={{ toolbarActions: TopActions }}>
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <NotesContainer />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
