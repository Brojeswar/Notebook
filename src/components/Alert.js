import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../context/alert/AlertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { message, setMessage, msgType } = alertContext;
  const [alertState, setAlertState] = useState("display_none");

  useEffect(() => {
    if (message !== null && message !== "") {
      setAlertState("");
    } else {
      setAlertState("display_none");
    }
  }, [message]);

  const hideAlert = () => {
    setMessage("");
  };

  return (
    <div>
      <div className={`alert alert-${msgType} ${alertState}`} role="alert">
        {message}
        <button
          type="button"
          className="btn-close alert-button"
          onClick={hideAlert}
        ></button>
      </div>
    </div>
  );
};

export default Alert;
