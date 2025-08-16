import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils";
import {
  Card,
  CardContent,
  CardActionArea,
  IconButton,
  Dialog,
  DialogContent,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditNoteDialogue from "./editNoteModal";

function NotesContainer() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [openNote, setOpenNote] = useState(null); // for view dialog
  const [isEditOpen, setIsEditOpen] = useState(false); // single edit dialog toggle
  const [editingNoteId, setEditingNoteId] = useState(null); // which note to edit

  const loggedInUserId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchWithAuth("http://localhost:5000/note").then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    await fetchWithAuth(`http://localhost:5000/note/${id}`, {
      method: "DELETE",
    });
    setNotes((prev) => prev.filter((n) => n._id !== id));
    if (openNote?._id === id) setOpenNote(null);
    if (editingNoteId === id) {
      setIsEditOpen(false);
      setEditingNoteId(null);
    }
  };

  const colors = [
    "#FFCDD2",
    "#EF9A9A",
    "#F8BBD0",
    "#E1BEE7",
    "#D1C4E9",
    "#C5CAE9",
    "#BBDEFB",
    "#B3E5FC",
    "#B2EBF2",
    "#C8E6C9",
    "#DCEDC8",
    "#FFF9C4",
    "#FFE0B2",
    "#FFECB3",
  ];

  const getColorFromId = (id) => {
    if (!id) return colors[0];
    let hash = 0;
    for (let i = 0; i < id.length; i++)
      hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    return colors[hash % colors.length];
  };

  // derive selected note once
  const editingNote = notes.find((n) => n._id === editingNoteId) || null;

  return (
    <>
      <div className="grid sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-200 h-max">
        {notes
          .filter((note) => note.user === loggedInUserId)
          .map((note) => {
            const bg = getColorFromId(note._id);
            const dateStr = String(note?.date || "").split("T")[0];

            return (
              <Card
                key={note._id}
                variant="outlined"
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  minHeight: 200,
                  boxShadow: 6,
                  transition: "transform 180ms ease, box-shadow 180ms ease",
                  backgroundColor: bg,
                  "&:hover": {
                    transform: "translateY(-2px) scale(1.02)",
                    boxShadow: 12,
                  },
                  px: 3,
                  py: 1,
                  m: 1,
                }}
              >
                <CardActionArea
                  onClick={() => setOpenNote(note)}
                  sx={{ height: 190 }}
                >
                  <CardContent sx={{ px: 3, py: 2 }}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      gutterBottom
                      noWrap
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        right: 12,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Title: {note.title}
                    </Typography>

                    <Divider
                      sx={{
                        mb: 1.5,
                        borderColor: "divider",
                        borderWidth: 1.5,
                        borderRadius: 2,
                        position: "relative",
                        bottom: 40,
                      }}
                    />

                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        pr: 6,
                        position: "absolute",
                        top: 50,
                        overflow: "hidden",
                        height: 100,
                      }}
                    >
                      {note.text}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ position: "absolute", left: 16, bottom: 10 }}
                    >
                      {dateStr}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <IconButton
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(note._id);
                  }}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <DeleteIcon />
                </IconButton>

                <IconButton
                  aria-label="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingNoteId(note._id);
                    setIsEditOpen(true);
                  }}
                  sx={{ position: "absolute", top: 8, right: 40 }}
                >
                  <EditIcon />
                </IconButton>
              </Card>
            );
          })}
      </div>

      {/* Single, centralized Edit dialog */}
      <EditNoteDialogue
        noteId={editingNoteId}
        open={isEditOpen}
        setOpen={(open) => {
          setIsEditOpen(open);
          if (!open) setEditingNoteId(null);
        }}
      />

      {/* Pop-out modal for viewing */}
      <Dialog
        open={Boolean(openNote)}
        onClose={() => setOpenNote(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { background: "transparent", boxShadow: "none" } }}
      >
        <DialogContent sx={{ p: 0 }}>
          {openNote && (
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: getColorFromId(openNote._id),
                boxShadow: 12,
                minHeight: 200,
                position: "relative",
              }}
            >
              <CardContent sx={{ px: 3, py: 2 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Title: {openNote.title}
                </Typography>
                <Divider
                  sx={{
                    mb: 1.5,
                    borderColor: "divider",
                    borderWidth: 1.5,
                    borderRadius: 2,
                    position: "relative",
                    bottom: 5,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {openNote.text}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {String(openNote?.date).split("T")[0]}
                </Typography>
              </CardContent>

              <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    setEditingNoteId(openNote._id);
                    setIsEditOpen(true);
                    setOpenNote(null);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(openNote._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
                <Button onClick={() => setOpenNote(null)}>Close</Button>
              </Box>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NotesContainer;
