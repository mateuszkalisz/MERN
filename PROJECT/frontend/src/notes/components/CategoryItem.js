import React, { useRef, useState } from "react";

import "./CategoryItem.css";

const CategoryItem = (props) => {
  const [isHidden, setIsHidden] = useState(true);

  const hoverTextRef = useRef();

  const hoverHandler = () => {
    if (isHidden) {
      setIsHidden(false);
      hoverTextRef.current.style.textDecoration = "underline";
    } else {
      setIsHidden(true);
      hoverTextRef.current.style.textDecoration = "none";
    }
  };

  return (
    <div className="category">
      <div
        className="categoryImg"
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
      >
        <img src={props.categoryImg} alt={props.categoryName} />
      </div>
      <div className="categoryTxt" ref={hoverTextRef}>
        <div className="categoryContent" >
          <div className="categoryHeader">
            <h3>{props.categoryName}</h3>
          </div>
          <div className="categoryCount">
            <p>
              {props.categoryCount > 1
                ? `${props.categoryCount} Notes`
                : `${props.categoryCount} Note`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
