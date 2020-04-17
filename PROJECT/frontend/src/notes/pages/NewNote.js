import React from "react";

import "./NewNote.css";

const NewNote = () => {

  const newNoteHandler = (e) =>{
    e.preventDefault();
    console.log("new note has been created");
  }

  return (
    <div className="newNote">
      <form classname="newNoteForm" onSubmit={newNoteHandler}>
        <div className="newTitle newInput newFormElement">
          <label htmlFor="newTitle">Title</label>
          <input type="text" id="newTitle" />
        </div>
        <div className="newContent newInput newFormElement">
          <label htmlFor="newContent">Content</label>
          <textarea id="newContent" />
        </div>
        <div className="selectCategory newInput newFormElement">
          <label htmlFor="selectCategory">Category</label>
          <select name="selectCategory" id="selectCategory">
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
          <input type="checkbox" id="newPrivacy" />
          <h4 className="newPolicy" style={{ display: "none" }}>
            The note will be visible only on your account.
          </h4>
        </div>
        <div className="newSubmit newFormElement">
          <button type="submit" onSubmit={newNoteHandler}>SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default NewNote;
