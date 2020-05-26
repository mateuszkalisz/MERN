import React from "react";
import ReactDOM from "react-dom";

import "./LoadingSpinner.css";

const LoadingSpinner = () => {

  const ls = (
    <div className="lds-dual-ring"></div>
  );

  return ReactDOM.createPortal(ls, document.getElementById("loading-spinner"));
};

export default LoadingSpinner;
