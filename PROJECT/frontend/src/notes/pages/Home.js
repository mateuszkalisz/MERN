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
        <div className="categoriesRow">
          <CategoryItem
            categoryName="Database"
            categoryCount="10"
            categoryImg={databaseIcon}
          />
          <CategoryItem
            categoryName="Komodo"
            categoryCount="32"
            categoryImg={komodoIcon}
          />
          <CategoryItem
            categoryName="Script"
            categoryCount="7"
            categoryImg={scriptIcon}
          />
        </div>
        <div className="categoriesRow">
          <CategoryItem
            categoryName="Admin"
            categoryCount="1"
            categoryImg={adminIcon}
          />
          <CategoryItem
            categoryName="Guides"
            categoryCount="81"
            categoryImg={instructionIcon}
          />
          <CategoryItem
            categoryName="Others"
            categoryCount="23"
            categoryImg={othersIcon}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
