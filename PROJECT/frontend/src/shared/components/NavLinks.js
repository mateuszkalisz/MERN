import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from "../../shared/context/AuthContext";


import './NavLinks.css';

const NavLinks = () =>{

    const auth = useContext(AuthContext);

    return(
        <ul className="navLinks">
            <li>
                <NavLink to="/" exact>HOME</NavLink>
            </li>
            <li>
                <NavLink to="/notes/new" exact>ADD NOTE</NavLink>
            </li>
            <li>
                <NavLink to={`/user/${auth.userId}/notes`} exact>MY NOTES</NavLink>
            </li>
            <li>
                <NavLink to={`/team/${auth.teamId}`} exact>MY TEAM</NavLink>
            </li>
            <li>
                <button onClick={auth.logout}>LOGOUT</button>
            </li>
        </ul>
    )
};

export default NavLinks;