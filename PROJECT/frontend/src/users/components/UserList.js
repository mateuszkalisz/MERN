import React from 'react';
import UserItem from './UserItem';

import './UserList.css';

const UserList = (props) =>{
    if(props.users.length === 0){
        return(
            <div className="usersCenter">
                <h2>No co-workers found.</h2>
            </div>
        )
    }
    else{
        return(
            <ul className="userList">
                {props.users.map(user => (
                    <UserItem 
                    key={user.id}
                    id={user.id}
                    userName={user.name}
                    notesCount={user.notes.length}
                    />
                ))}
            </ul>
        )
    }
};

export default UserList;