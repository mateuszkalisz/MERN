import React from "react";

import "./Header.css";
import logo from "../../img/logo.png";

const Header = () => {
  return (
    <header className="authHeader">
      <div className="authCenter">
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
        <div className="description clearfix">
          <h1>rackbrain.com</h1>
          <h2>The best knowledge base in the world!</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
