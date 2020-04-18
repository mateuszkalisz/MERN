import React, {useState} from "react";

import "./NewNote.css";

const NewNote = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("SQL");
  const [privacy, setPrivacy] = useState(false);

  const titleHandler = (e) =>{
    setTitle(e.target.value);
  }

  const contentHandler = (e) =>{
    setContent(e.target.value);
  }

  const categoryHandler = (e) =>{
    setCategory(e.target.value);
  }

  const privacyHandler = () =>{
    setPrivacy(prevState => !prevState);
  }

  const newNoteHandler = (e) =>{
    e.preventDefault();
    console.log("new note has been created", [title, content,category,privacy]);
  }

  return (
    <div className="newNote">
      <form className="newNoteForm" onSubmit={newNoteHandler}>
        <div className="newTitle newInput newFormElement">
          <label htmlFor="newTitle">Title</label>
          <input type="text" id="newTitle" value={title} onChange={titleHandler}/>
        </div>
        <div className="newContent newInput newFormElement">
          <label htmlFor="newContent">Content</label>
          <textarea id="newContent" value={content} onChange={contentHandler}/>
        </div>
        <div className="selectCategory newInput newFormElement">
          <label htmlFor="selectCategory">Category</label>
          <select name="selectCategory" id="selectCategory" value={category} onChange={categoryHandler}>
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
          <input type="checkbox" id="newPrivacy" checked={privacy} onChange={privacyHandler}/>
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
