import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Modal from "../../shared/UIElements/Modal";
import { AuthContext } from "../../shared/context/AuthContext";

import "./Auth.css";

const Auth = () => {
  const DUMMY_USER = [
    {
      id: 1,
      name: "Mateusz",
      password: "haslo123",
      email: "mateusz@mk.pl",
      team: "CoreFR",
    },
  ];

  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isInvalid, setIsInvalid] = useState(null);
  const [error, setError] = useState();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("CoreFR");

  const closeModal = () =>{
    setIsInvalid(null);
  }

  const inputHandler = (e) => {
    //log in and sign up
    if (e.target.id === "name") {
      setName(e.target.value);
    }
    if (e.target.id === "password") {
      setPassword(e.target.value);
    }

    //sign up
    if (!isLoginMode) {
      if (e.target.id === "email") {
        setEmail(e.target.value);
      }

      if (e.target.id === "team") {
        setTeam(e.target.value);
        console.log(e.target.value);
      }
    }
  };

  const authModeHandler = () => {
    if (isLoginMode) {
      setIsLoginMode(false);
    } else {
      setIsLoginMode(true);
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
}

  const authSubmitHandler = (e) => {
    e.preventDefault();

    if(name.length < 6){
      setError("User name must be at least 6 characters. Please try again");
      setIsInvalid(true);
      return;
    }

    if(password.length < 8){
      setError("Password must be at least 6 characters. Please try again");
      setIsInvalid(true);
      return;
    }

    if (isLoginMode) {
      if (name === DUMMY_USER[0].name && password === DUMMY_USER[0].password) {
        console.log("Succesful login");
        setIsInvalid(true);
        auth.login(DUMMY_USER[0].id);
      } else {
        setError("Wrong credentials");
        setIsInvalid(true);
        return;
      }


    } else {
      if (name === DUMMY_USER[0].name){
        setError("User existed");
        setIsInvalid(true);
        return;
      }

      if(!validateEmail(email)){
        setError("Invalid email address. Please try again!");
        setIsInvalid(true);
        return;
      }

      auth.login();
    }
  };

  let authHeader;
  let authFooter;

  if (isLoginMode) {
    authHeader = <h1 className="center">Log In</h1>;
    authFooter = (
      <h2 className="center">
        I'm a new user. <span onClick={authModeHandler}>Sign Up</span>
      </h2>
    );
  } else {
    authHeader = <h1 className="center">Sign Up</h1>;
    authFooter = (
      <h2 className="center">
        You aren't new? Return to{" "}
        <span onClick={authModeHandler}>Login In</span>
      </h2>
    );
  }

  return (
    <div className={`authentication ${isInvalid ? 'disabled': ''}`}>
    {isInvalid ? <Modal onClose={closeModal} className='error' header='Error' content={error}/> : null}
    <div className='auth'>
      <Header />
      <main className="authPanel">
        <div className="loginHeader">{authHeader}</div>
        <div className="authForm">
          <form onSubmit={authSubmitHandler} noValidate>
            <div className="authInput">
              <label htmlFor="name">User name</label>
              <input
                id="name"
                type="text"
                placeholder="User name"
                value={name}
                onChange={inputHandler}
                disabled={isInvalid === null ? false : true}
              />
            </div>
            <div className="authInput">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={inputHandler}
                disabled={isInvalid === null ? false : true}
              />
            </div>
            {!isLoginMode ? (
              <div className="authInput">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@example.com"
                  onChange={inputHandler}
                  value={email}
                  disabled={isInvalid === null ? false : true}
                  />
              </div>
            ) : null}
            {!isLoginMode ? (
              <div className="authInput">
                <label htmlFor="team">Team</label>
                <select
                  name="team"
                  id="team"
                  onChange={inputHandler}
                  value={team}
                  disabled={isInvalid === null ? false : true}
                  >
                  <option value="CoreFr">CoreFR</option>
                  <option value="CoreUK">CoreUK</option>
                  <option value="WOBE">WOBE</option>
                </select>
              </div>
            ) : null}
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
    </div>
  );
};

export default Auth;
