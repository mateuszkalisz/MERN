import React from "react";
import ReactDOM from "react-dom";

import "./ErrorModal.css";

const ErrorModal = (props) => {

  const modal = (
    <div
      className={`modal ${props.className}`}
    >
      <div className={`modalHeader ${props.className}`}>
        <h2>{props.header}</h2>
      </div>
      <div className={`modalContent ${props.className}`}>
        <p>{props.content}</p>
      </div>
      <div className={`modalCancel ${props.className}`}>
        <button onClick={props.onClose}>Cancel</button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("error-modal"));
};

export default ErrorModal;
