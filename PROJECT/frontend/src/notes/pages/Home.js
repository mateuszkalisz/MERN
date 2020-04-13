import React from "react";

import searchIcon from "../../img/search3.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <header className="searcher">
        <h2>Welcome!</h2>
        <div className="searchPanel">
          <input type="text" placeholder="What are you looking for?" />
          <button>
            <img src={searchIcon} alt="search" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Home;
