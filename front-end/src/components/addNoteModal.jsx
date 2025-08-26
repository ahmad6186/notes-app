// import * as React from "react";
import React, { useState } from "react";
import { fetchWithAuth } from "../utils";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
export default function CreateNoteDialogue({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [note, setNote] = useState({
    title: "",
    text: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title.trim() || !note.text.trim()) return;

    const newNote = {
      title: note.title,
      date: note.date || new Date().toISOString().split("T")[0],
      text: note.text,
    };

    const response = await fetchWithAuth("http://localhost:5000/note/addnote", {
      method: "POST",
      body: JSON.stringify(newNote),
    });

    // Reset note state
    setNote({
      title: "",
      text: "",
      date: "",
    });
    window.location.reload();

    setOpen(false);
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm" // options: 'xs', 'sm', 'md', 'lg', 'xl'
        fullWidth
      >
        <DialogTitle>Add a Note</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={note.title}
              onChange={handleChange}
            />
            <TextField
              id="outlined-multiline-static"
              label="write here"
              required
              multiline
              fullWidth
              type="text"
              margin="dense"
              rows={4}
              name="text"
              value={note.text}
              onChange={handleChange}
            />
            <DialogActions>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                form="subscription-form"
              >
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
