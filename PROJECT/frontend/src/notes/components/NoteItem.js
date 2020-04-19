import React from "react";
import { Link } from "react-router-dom";
import "./NoteItem.css";

const NoteItem = (props) => {
  let shortDescription;

  const first100Letters = () => {
    shortDescription = props.noteContent.slice(0,100);

    shortDescription += ' ...'
  };

  first100Letters();

  return (
    <li className="noteItem">
      <Link to={`/notes/${props.id}`}>
        <div className="noteHeader">
          <h2>{props.noteTitle}</h2>
        </div>
        <div className="noteDescription">
          <p>{shortDescription}</p>
        </div>
        <div className="noteFooter">
          <h3>{props.noteAuthor}</h3>
          <h4>{props.noteCreateDate}</h4>
        </div>
      </Link>
    </li>
  );
};

export default NoteItem;
