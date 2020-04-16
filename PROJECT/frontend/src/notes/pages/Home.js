import React from "react";
import CategoryItem from "../components/CategoryItem";

import searchIcon from "../../img/search3.png";
import databaseIcon from "../../img/database.png";
import komodoIcon from "../../img/komodo.png";
import scriptIcon from "../../img/script.png";
import adminIcon from "../../img/admin.png";
import instructionIcon from "../../img/instruction.png";
import othersIcon from "../../img/others.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <section className="searcher">
        <div className="centerSearcher">
          <h2>Welcome!</h2>
          <div className="searchPanel">
            <input type="text" placeholder="What are you looking for?" />
            <button>
              <img src={searchIcon} alt="search" />
            </button>
          </div>
        </div>
      </section>
      <section className="categories">
          <CategoryItem
            categoryName="SQL/Database"
            categoryCount="10"
            categoryImg={databaseIcon}
          />
          <CategoryItem
            categoryName="ETL/Komodo"
            categoryCount="32"
            categoryImg={komodoIcon}
          />
          <CategoryItem
            categoryName="Scripting"
            categoryCount="7"
            categoryImg={scriptIcon}
          />
          <CategoryItem
            categoryName="Administration"
            categoryCount="1"
            categoryImg={adminIcon}
          />
          <CategoryItem
            categoryName="Instructions &amp; Guides"
            categoryCount="81"
            categoryImg={instructionIcon}
          />
          <CategoryItem
            categoryName="Others"
            categoryCount="23"
            categoryImg={othersIcon}
          />
      </section>
    </div>
  );
};

export default Home;
