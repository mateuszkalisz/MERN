import React from "react";
import ReactDOM from "react-dom";

import './DeleteModal.css';

const DeleteModal = (props) => {

  const deleteModal = (
    <div
      className={`modal ${props.className}`}
    >
      <div className={`modalHeader ${props.className}`}>
        <h2>{props.header}</h2>
      </div>
      <div className={`modalContent ${props.className}`}>
        <p>{props.content}</p>
      </div>
      <div className={`modalCancel ${props.className}` }>
        <button className='modalDeleteButton' onClick={props.onDelete}>Yes</button>
        <button onClick={props.onClose}>No</button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(deleteModal, document.getElementById("delete-modal"));
};

export default DeleteModal;
