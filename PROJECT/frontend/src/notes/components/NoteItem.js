import React from "react";
import { Link } from "react-router-dom";
import scriptIcon from "../../img/clip-script.png";
import etlIcon from "../../img/clip-etl.png";
import sqlIcon from "../../img/clip-sql.png";
import adminIcon from "../../img/clip-admin.png";
import othersIcon from "../../img/clip-others.png";
import igIcon from "../../img/clip-ig.png";
import "./NoteItem.css";

const NoteItem = (props) => {
  let shortDescription;

  const first100Letters = () => {
    if (props.noteContent.length > 100) {
      shortDescription = props.noteContent.slice(0, 100);

      shortDescription += "...";
    } else {
      shortDescription = props.noteContent;
    }
  };

  let noteIcon;

  const selectIcon = () => {
    switch (props.categoryNote) {
      case "SCRIPT":
        noteIcon = scriptIcon;
        break;
      case "SQL":
        noteIcon = sqlIcon;
        break;
      case "ADMIN":
        noteIcon = adminIcon;
        break;
      case "IG":
        noteIcon = igIcon;
        break;
      case "ETL":
        noteIcon = etlIcon;
        break;
      case "OTHERS":
        noteIcon = othersIcon;
        break;
      default:
        noteIcon = "";
    }
  };

  first100Letters();
  selectIcon();

  return (
    <li className="noteItem">
      <Link to={`/notes/${props.id}`}>
        {/* <div > */}
        <img
          className="noteItemIcon"
          src={noteIcon}
          alt="scriptIcon"
          style={!noteIcon ? { display: "none" } : {}}
        />
        {/* </div> */}
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
