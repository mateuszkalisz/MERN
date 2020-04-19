import React, { useState } from "react";
import Modal from "../../shared/UIElements/Modal";

import "./NewNote.css";

const NewNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("SQL");
  const [privacy, setPrivacy] = useState(false);

  const [showModal, setShowModal] = useState(null);
  const [modalContent, setModalContent] = useState();
  const [modalType, setModalType] = useState('Error');

  const closeModal = () => {
    setShowModal(null);
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const privacyHandler = () => {
    setPrivacy((prevState) => !prevState);
  };

  const newNoteHandler = (e) => {
    e.preventDefault();

    if((title.length < 5 || title.length > 20) && content.length < 8){
      setModalType('Error');
      setModalContent(
        "Title and description is invalid! Title must be between 5 characters and 20 characters! Description must be at least 8 characters! Please try again."
      );
      setShowModal(true);
    }

    else if (title.length < 5 || title.length > 20) {
      setModalType('Error');
      setModalContent(
        "Title must be between 5 characters and 20 characters! Please try again."
      );
      setShowModal(true);
    }

    else if (content.length < 8) {
      setModalType('Error');
      setModalContent(
        "Description must be at least 8 characters! Please try again."
      );
      setShowModal(true);
    }

    if(title.length >= 5 && title.length <= 20 && content.length >= 8){

    setModalType('Succeed');
    setModalContent('New note has been created');
    setShowModal(true);
    setTitle("");
    setContent("");
    setCategory("SQL");
    setPrivacy(false);
    }
  };

  return (
    <>
      {showModal ? (
        <Modal
          onClose={closeModal}
          className={modalType}
          header={modalType}
          content={modalContent}
        />
      ) : null}
      <div className={`newNote ${showModal ? "disabled" : ""}`}>
        <form className="newNoteForm" onSubmit={newNoteHandler}>
          <div className="newTitle newInput newFormElement">
            <label htmlFor="newTitle">Title</label>
            <input
              type="text"
              id="newTitle"
              value={title}
              onChange={titleHandler}
              disabled={showModal === null ? false : true}
            />
          </div>
          <div className="newContent newInput newFormElement">
            <label htmlFor="newContent">Content</label>
            <textarea
              id="newContent"
              value={content}
              onChange={contentHandler}
              disabled={showModal === null ? false : true}
            />
          </div>
          <div className="selectCategory newInput newFormElement">
            <label htmlFor="selectCategory">Category</label>
            <select
              name="selectCategory"
              id="selectCategory"
              value={category}
              onChange={categoryHandler}
              disabled={showModal === null ? false : true}
            >
              <option value="SQL">SQL/Database</option>
              <option value="ETL">ETL/Komodo</option>
              <option value="SCRIPT">Scripting</option>
              <option value="ADMIN">Administration</option>
              <option value="IG">Instruction &amp; Guide</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>
          <div className="newPrivacy newFormElement">
            <label htmlFor="newPrivacy">Private</label>
            <input
              type="checkbox"
              id="newPrivacy"
              checked={privacy}
              onChange={privacyHandler}
              disabled={showModal === null ? false : true}
            />
            <h4 className="newPolicy" style={{ display: "none" }}>
              The note will be visible only on your account.
            </h4>
          </div>
          <div className="newSubmit newFormElement">
            <button
              type="submit"
              onSubmit={newNoteHandler}
              disabled={showModal === null ? false : true}
              style={showModal === null ? {} : {cursor: 'default', color: '#a9a9a9'}}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewNote;
