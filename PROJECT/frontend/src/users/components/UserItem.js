import React from "react";
import { Link } from "react-router-dom";
import userIcon from "../../img/user.png";

import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="userItem">
      <Link to={`/trzebazmienicboniewiemcoto`}>
      <img src={userIcon} alt="userIcon" />
      <div className="userText">
        <h2>{props.userName}</h2>
        <p>{props.notesCount > 0 ? 'Notes: ' : 'Note: '}{props.notesCount}</p>
      </div>
      </Link>
    </li>
  );
};

export default UserItem;
