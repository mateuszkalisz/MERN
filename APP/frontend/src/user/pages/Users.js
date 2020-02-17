import React from 'react';
import UsersList from '../components/UsersList';

const Users = () =>{

    const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTo2hYkoGpE1_VutbES4ON4-Ku3NyzYbGf3-PEMQrqFHztdcQM-';

    const USERS = [
        {
        id: 'u1',
        name: 'eM Key',
        image: img,
        placeCount: 3
    }
];

    return <UsersList items={USERS}/>
}

export default Users;