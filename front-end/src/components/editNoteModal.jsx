import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

// export default function EditNoteDialogue({ open, setOpen, noteId, onSaved }) {
//   const [note, setNote] = useState({ title: "", text: "", date: "" });
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   const handleClose = () => setOpen(false);

//   // Load note when dialog opens
//   useEffect(() => {
//     let ignore = false;

//     async function load() {
//       setError("");
//       if (!open) return;

//       if (!noteId) {
//         setError("No note selected to edit.");
//         setNote({ title: "", text: "", date: "" });
//         return;
//       }

//       setLoading(true);
//       try {
//         const data = await fetchWithAuth(
//           `http://localhost:5000/note/${noteId}`,
//           {
//             method: "GET",
//           }
//         );

//         if (ignore) return;

//         if (!data || (!data.title && !data.text)) {
//           setError("Could not load the note.");
//           setNote({ title: "", text: "", date: "" });
//           return;
//         }

//         setNote({
//           title: data.title || "",
//           text: data.text || "",
//           // keep YYYY-MM-DD for the date input
//           date: (data.date || "").split("T")[0] || "",
//         });
//       } catch (e) {
//         if (!ignore) setError("Failed to fetch the note.");
//       } finally {
//         if (!ignore) setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       ignore = true;
//     };
//   }, [open, noteId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNote((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!noteId) return; // hard requirement: edit-only
//     if (!note.title.trim() || !note.text.trim()) return;

//     setSaving(true);
//     setError("");
//     try {
//       await fetchWithAuth(`http://localhost:5000/note/${noteId}`, {
//         method: "PUT",
//         body: JSON.stringify({
//           title: note.title,
//           text: note.text,
//           date: note.date || new Date().toISOString().split("T")[0],
//         }),
//       });

//       if (typeof onSaved === "function") onSaved();
//       setOpen(false);
//     } catch (e) {
//       setError("Failed to save changes.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const canSave =
//     !!noteId &&
//     !loading &&
//     !saving &&
//     note.title.trim().length > 0 &&
//     note.text.trim().length > 0;

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//       <DialogTitle>Edit Note</DialogTitle>
//       <DialogContent>
//         {error && <DialogContentText color="error">{error}</DialogContentText>}
//         {loading ? (
//           <DialogContentText>Loading note…</DialogContentText>
//         ) : (
//           <form onSubmit={handleSubmit} id="edit-note-form">
//             <TextField
//               autoFocus
//               required
//               margin="dense"
//               name="title"
//               label="Title"
//               type="text"
//               fullWidth
//               variant="standard"
//               value={note.title}
//               onChange={handleChange}
//             />

//             <TextField
//               margin="dense"
//               name="date"
//               label="Date"
//               type="date"
//               fullWidth
//               variant="standard"
//               value={note.date}
//               onChange={handleChange}
//               InputLabelProps={{ shrink: true }}
//             />

//             <TextField
//               margin="dense"
//               name="text"
//               label="Write here"
//               required
//               multiline
//               fullWidth
//               type="text"
//               rows={4}
//               value={note.text}
//               onChange={handleChange}
//             />
//           </form>
//         )}
//       </DialogContent>

//       <DialogActions>
//         <Button variant="contained" onClick={handleClose} disabled={saving}>
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           type="submit"
//           form="edit-note-form"
//           disabled={!canSave}
//         >
//           Save Changes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
export default function EditNoteDialogue({ open, setOpen, noteId }) {
  console.log(noteId);
  const handleClose = () => {
    setOpen(false);
  };
  const [note, setNote] = useState({
    title: "",
    text: "",
    date: "",
  });
  useEffect(() => {
    console.log("fetching note");
    const fetchNote = async () => {
      const data = await fetchWithAuth(`http://localhost:5000/note/${noteId}`, {
        method: "GET",
      });
      console.log(data);
      setNote({
        title: data.title || "",
        text: data.text || "",
        date: data.date?.split("T")[0] || "",
      });
    };

    if (noteId) fetchNote();
  }, [noteId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("note");
    if (!note.title.trim() || !note.text.trim()) return;

    const response = await fetchWithAuth(
      `http://localhost:5000/note/${noteId}`,
      {
        method: "PUT",
        body: JSON.stringify(note),
      }
    );

    window.location.reload();
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        // PaperProps={{
        //   sx: {
        //     // background: "transparent", // modal content background is transparent
        //     boxShadow: "none",
        //   },
        // }}
        // BackdropProps={{
        //   sx: {
        //     backgroundColor: "rgba(0, 0, 0, 0.5)", // dim the background (50% opacity)
        //   },
        // }}
      >
        <DialogTitle>Edit Note</DialogTitle>
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
                Save changes
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
