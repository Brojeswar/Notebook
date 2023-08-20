import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../context/alert/AlertContext";

const ModalAlert = () => {
  const alertContext = useContext(AlertContext);
  const { modalMessage, setModalMessage } = alertContext;
  const [alertState, setAlertState] = useState("display_none");

  useEffect(() => {
    if (modalMessage !== null && modalMessage !== "") {
      setAlertState("");
    } else {
      setAlertState("display_none");
    }
  }, [modalMessage]);

  const hideAlert = () => {
    setModalMessage("");
  };

  return (
    <div>
      <div
        className={`alert alert-danger modal-alert ${alertState}`}
        role="alert"
      >
        {modalMessage}
        <button
          type="button"
          className="btn-close alert-button"
          onClick={hideAlert}
        ></button>
      </div>
    </div>
  );
};

export default ModalAlert;
