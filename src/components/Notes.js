import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/note/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import AlertContext from "../context/alert/AlertContext";
import Login from "./Login";

const Notes = () => {
  const noteContext = useContext(NoteContext);
  const { notes, getNotes, editNote } = noteContext;
  const alertContext = useContext(AlertContext);
  const { setMessage, setMsgType, setModalMessage, validateNote } =
    alertContext;

  const initialNoteState = {
    title: "",
    description: "",
    tag: "",
  };

  const [note, setNote] = useState(initialNoteState);

  if (localStorage.getItem("token")) {
    getNotes();
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    }
    //eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote);
  };

  const ref = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    let msg = validateNote(note.title, note.description, note.tag);
    if (msg !== null && msg !== "") {
      setModalMessage(msg);
    } else {
      setModalMessage("");
      editNote(note._id, note.title, note.description, note.tag);
      ref.current.click();
      setMsgType("success");
      setMessage("Note updated successfully");
    }
  };

  const onChange = (e) => {
    setModalMessage("");
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {localStorage.getItem("token") && <AddNote />}
      {localStorage.getItem("token") && (
        <EditNote
          note={note}
          handleClick={handleClick}
          onChange={onChange}
          ref={ref}
        />
      )}
      {localStorage.getItem("token") && (
        <div className="row my-3">
          <h2>Your Notes</h2>
          <div className="container mx-1">
            {notes.length === 0 && "No notes to display"}
          </div>
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
        </div>
      )}
      {!localStorage.getItem("token") && <Login />}
    </>
  );
};

export default Notes;
