import React from "react";

import "./CategoryItem.css";

const CategoryItem = (props) => {
  return (
    <div className="category">
      <div className="categoryImg">
          <img src={props.categoryImg} alt={props.categoryName} />
      </div>
      <div className="categoryContent">
        <div className="categoryHeader">
          <h3>{props.categoryName}</h3>
        </div>
        <div className="categoryCount">
          <p>
            {props.categoryCount > 1
              ? `${props.categoryCount} Articles`
              : `${props.categoryCount} Article`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
