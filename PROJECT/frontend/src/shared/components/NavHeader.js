import React from "react";
import {Link} from 'react-router-dom';
import Logo from "../../img/logo.png";

import "./NavHeader.css";

const NavHeader = () => {
  return (
    <Link to="/" className="navHeader">
      <div className="navHeaderImg">
        <img src={Logo} alt="logo" />
      </div>
      <div className="navHeaderContent">
        <h2>rackbrain.com</h2>
      </div>
    </Link>
  );
};

export default NavHeader;
