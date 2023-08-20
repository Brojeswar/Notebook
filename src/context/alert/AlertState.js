import React, { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const validateNote = (title, description, tag) => {
    let msg = "";
    if (title.length <= 3) {
      msg = "Title should be more than 3 characters";
    } else if (description.length <= 5) {
      msg = "Description should be more than 5 characters";
    } else if (tag.length <= 0) {
      msg = "Tag is mandatory field";
    }
    return msg;
  };

  return (
    <AlertContext.Provider
      value={{
        message,
        setMessage,
        msgType,
        setMsgType,
        validateNote,
        modalMessage,
        setModalMessage,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
