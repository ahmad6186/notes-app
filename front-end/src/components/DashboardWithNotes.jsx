// DashboardWithNotes.jsx
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import DescriptionIcon from "@mui/icons-material/Description";
import NoteIcon from "@mui/icons-material/Note";
import { Add } from "@mui/icons-material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import EventNoteIcon from "@mui/icons-material/EventNote";

import { fetchWithAuth } from "../utils";
import NotesContainer from "./NotesContainer";
import CreateNoteDialogue from "./addNoteModal";

// 🔵 Blue navbar via palette.primary
const themeBase = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: { light: true, dark: true },
  palette: { primary: { main: "#1976d2" } },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

/** Small dialog to create a folder */
function CreateFolderDialog({ open, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const createFolder = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      setSubmitting(true);
      const res = await fetchWithAuth(
        "http://localhost:5000/folder/addfolder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );
      // expect the API to return the created folder { _id, name, ... }
      onCreated?.(res);
      setName("");
      onClose();
    } catch (e) {
      console.error(e);
      alert(e.message || "Failed to create folder");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Create New Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="Folder name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={createFolder}
          disabled={submitting}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/** Top-right toolbar actions: Add Note + Logout + Dark/Light */
function TopActions() {
  const navigate = useNavigate();
  const { mode, setMode } = useColorScheme();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
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
        <IconButton onClick={toggleMode} sx={{ ml: 1 }} color="inherit">
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>

      <CreateNoteDialogue open={openModal} setOpen={setOpenModal} />
    </>
  );
}

/** Sidebar footer with a New Folder icon button */
function SidebarFooter({ onFolderCreated }) {
  const [openFolder, setOpenFolder] = useState(false);

  return (
    <>
      <Tooltip title="New Folder">
        <IconButton
          size="large"
          color="inherit"
          onClick={() => setOpenFolder(true)}
          sx={{ m: 1 }}
        >
          <CreateNewFolderIcon />
        </IconButton>
      </Tooltip>

      <CreateFolderDialog
        open={openFolder}
        onClose={() => setOpenFolder(false)}
        onCreated={(folder) => {
          onFolderCreated?.(folder);
        }}
      />
    </>
  );
}

export default function DashboardWithNotes() {
  const [folders, setFolders] = useState([]);

  // Fetch folders once
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchWithAuth(
          "http://localhost:5000/folder/showallfolders",
          { method: "GET" }
        );
        if (Array.isArray(res)) setFolders(res);
      } catch (e) {
        console.error("Failed to load folders", e);
      }
    })();
  }, []);

  // Update folders after creating a new one
  const handleFolderCreated = (folder) => {
    if (!folder) return;
    setFolders((prev) => [folder, ...prev]);
  };

  // Build navigation dynamically with folders
  const navigation = useMemo(
    () => [
      {
        segment: "notes",
        title: "Notes",
        icon: <NoteIcon />,
        children: [
          { segment: "all", title: "All Notes", icon: <DescriptionIcon /> },
          { segment: "pinned", title: "Pinned", icon: <DescriptionIcon /> },
        ],
      },
      {
        segment: "folders",
        title: "Folders",
        icon: <FolderIcon />,
        children: folders.map((f) => ({
          segment: `folder-${f._id}`,
          title: f.name,
          icon: <FolderOpenIcon />,
        })),
      },
    ],
    [folders]
  );

  return (
    <AppProvider
      navigation={navigation}
      theme={themeBase}
      branding={{ title: "NOTES APP", logo: <EventNoteIcon /> }}
    >
      <DashboardLayout
        slots={{
          toolbarActions: TopActions,
          sidebarFooter: (props) => (
            <SidebarFooter onFolderCreated={handleFolderCreated} {...props} />
          ),
        }}
        slotProps={{ appBar: { color: "primary" } }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <NotesContainer />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
