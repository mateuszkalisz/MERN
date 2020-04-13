import React from "react";
import NavHeader from "./NavHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";

const MainNavigation = () => {
  return (
  <div className="navigation">
    <NavHeader />
    <nav>
    <NavLinks />
    </nav>
  </div>
  );
};

export default MainNavigation;
