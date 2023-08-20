import React, { useContext } from "react";
import NoteContext from "../context/note/NoteContext";
import AlertContext from "../context/alert/AlertContext";

const NoteItem = (props) => {
  const noteContext = useContext(NoteContext);
  const { deleteNote } = noteContext;
  const { note, updateNote } = props;

  const alertContext = useContext(AlertContext);
  const { setMessage, setMsgType } = alertContext;

  const handleDelete = () => {
    deleteNote(note._id);
    setMsgType("success");
    setMessage("Note deleted successfully");
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={handleDelete}
            ></i>
            <i
              className="fa-solid fa-pen-to-square"
              onClick={() => updateNote(note)}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
