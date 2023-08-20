import React, { useContext, useState } from "react";
import NoteContext from "../context/note/NoteContext";
import AlertContext from "../context/alert/AlertContext";

const AddNote = () => {
  const noteContext = useContext(NoteContext);
  const { addNote } = noteContext;
  const alertContext = useContext(AlertContext);
  const { setMessage, setMsgType, validateNote } = alertContext;

  const initialNoteState = {
    title: "",
    description: "",
    tag: "",
  };

  const [note, setNote] = useState(initialNoteState);

  const handleClick = (e) => {
    e.preventDefault();
    let msg = validateNote(note.title, note.description, note.tag);
    if (msg !== null && msg !== "") {
      setMsgType("danger");
      setMessage(msg);
    } else {
      setMessage("");
      addNote(note.title, note.description, note.tag);
      setNote(initialNoteState);
      setMsgType("success");
      setMessage("Note created successfully");
    }
  };

  const onChange = (e) => {
    setMessage("");
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="title"
              aria-describedby="title"
              onChange={onChange}
              value={note.title}
              minLength={3}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              name="description"
              type="text"
              className="form-control"
              id="description"
              onChange={onChange}
              value={note.description}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Tag
            </label>
            <input
              name="tag"
              type="text"
              className="form-control"
              id="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
