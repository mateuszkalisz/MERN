import React, { useState, useContext } from "react";
import Header from "../components/Header";

import "./Auth.css";
import { AuthContext } from "../../shared/context/AuthContext";

const Auth = () => {

  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const authSubmitHandler = () =>{
    if(isLoginMode){
      auth.login();
    }
    else{
      auth.logout();
    }
  }

  let authHeader;
  let authFooter;

  if (isLoginMode) {
    authHeader = <h1 className="center">Log In</h1>;
    authFooter = (
      <h2 className="center">
        I'm a new user. <span>Sign Up</span>
      </h2>
    );
  } else {
    authHeader = <h1 className="center">Sign Up</h1>;
    authFooter = (
      <h2 className="center">
        You aren't now? Return to <span>Login In</span>
      </h2>
    );
  }

  return (
    <div className="auth">
      <Header />
      <main className="authPanel">
        <div className="loginHeader">{authHeader}</div>
        <div className="authForm">
          <form onSubmit={authSubmitHandler}>
            <div className="authInput">
              <label htmlFor="name">User name</label>
              <input id="name" type="text" placeholder="User name" />
            </div>
            <div className="authInput">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Password" />
            </div>
            <div className="center">
            <button className="authButton" type="submit">
              {isLoginMode ? "Submit" : "Create Account"}
            </button>
            </div>
          </form>
        </div>
        <div className="loginFooter">{authFooter}</div>
      </main>
    </div>
  );
};

export default Auth;
