import React, {useContext} from "react";
import UserList from "../components/UserList";
import {AuthContext} from "../../shared/context/AuthContext";

import "./TeamUsers.css";

const TeamUsers = () => {

    const auth = useContext(AuthContext);

    const DUMMY_USER = [
      {
        id: 1,
        name: "Mateusz",
        password: "haslo123",
        email: "mateusz@mk.pl",
        team: "CoreFR",
        notes: [
          {id: 1, place: 'pierwsze miejsce'},
          {id: 2, place: 'drugie miejsce'}
        ]
      },
      {
        id: 2,
        name: "Maja",
        password: "haslo123",
        email: "maja@ms.pl",
        team: "CoreFR",
        notes: [
          {id: 1, place: 'pierwsze miejsce'},
          {id: 2, place: 'drugie miejsce'},
          {id: 3, place: 'trzecie miejsce'}
        ]
      },
      {
        id: 3,
        name: "Jurek",
        password: "haslo123",
        email: "jurek@jb.pl",
        team: "CoreFR",
        notes: [
          {id: 1, place: 'pierwsze miejsce'},
          {id: 2, place: 'drugie miejsce'},
          {id: 3, place: 'trzecie miejsce'}
        ]
      },
      {
        id: 4,
        name: "Andrzej",
        password: "haslo123",
        email: "andrzej@az.pl",
        team: "WOBE",
        notes: [
          {id: 1, place: 'pierwsze miejsce'},
          {id: 2, place: 'drugie miejsce'}
        ]
      }
    ];


    const teamUsers = DUMMY_USER.filter(user => (user.team === auth.teamId && user.id !== auth.userId));

  return (
    <UserList users={teamUsers}/>
  );
};

export default TeamUsers;
