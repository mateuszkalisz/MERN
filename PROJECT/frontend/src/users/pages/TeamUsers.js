import React, { useContext, useEffect, useState } from "react";
import UserList from "../components/UserList";
import { AuthContext } from "../../shared/context/AuthContext";
import Modal from "../../shared/UIElements/Modal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";

import "./TeamUsers.css";

const TeamUsers = () => {
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(null);
  const [team, setTeam] = useState([]);

  const closeModal = () =>{
    setIsInvalid(null);
  }

  useEffect(()=>{
    const getTeamUsersHandler = async () =>{
      try{
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/team/${auth.teamId}`);

        const jsonData = await response.json();

        setIsLoading(false);

        if(!response.ok){
          setError(jsonData.message);
          setIsInvalid(true);

        }
        setTeam(jsonData.teamUsers);
      }
      catch(err){
        setIsLoading(false);
        setError(err.message);
        setIsInvalid(true);
      }
    }
    getTeamUsersHandler();
  }, [])


  return (
    <>
      {isInvalid ? <Modal onClose={closeModal} className='error' header='Error' content={error}/> : null}
      {isLoading ? <LoadingSpinner/> : null}
      <div className="teamUsers">
        <UserList users={team} />
      </div>
    </>
  );
};

export default TeamUsers;
