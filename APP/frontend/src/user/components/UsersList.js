import React from "react";
import "./UsersList.css";
import UserItem from "./UserItem";

const UsersList = props => {
  if (props.items.length === 0) {
    return <div className="center">No users found.</div>;
  } else {
    return (
      <ul className='users-list'>
        {props.items.map(item => (
          <UserItem
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            placeCount={item.places}
          />
        ))}
      </ul>
    );
  }
};

export default UsersList;
