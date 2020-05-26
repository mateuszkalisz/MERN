import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Modal from "../../shared/UIElements/Modal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/AuthContext";

import "./Auth.css";

const Auth = () => {
  
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isInvalid, setIsInvalid] = useState(null);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

//   const validateEmail = (email) => {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(String(email).toLowerCase());
// }

  const authSubmitHandler = async (e) => {
    e.preventDefault();

    if(name.length < 2){
      setError("User name must be at least 2 characters. Please try again");
      setIsInvalid(true);
      return;
    }

    if(password.length < 8){
      setError("Password must be at least 8 characters. Please try again");
      setIsInvalid(true);
      return;
    }

    //login

    if (isLoginMode) {

      try{
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            name,
            password
          })
        });
        const data = await response.json();

        setIsLoading(false);

        if(response.ok){
          // console.log(data);
          auth.login(data.user.id, data.user.team);
        }
        else{
          setError(data.message);
          setIsInvalid(true);
        }

      }
      catch(err){
        console.log('error error', err);
        setIsLoading(false);
      }


      // if (name === DUMMY_USER[0].name && password === DUMMY_USER[0].password) {
      //   console.log("Succesful login");
      //   setIsInvalid(true);
      //   auth.login(DUMMY_USER[0].id, team);
      // } else {
      //   setError("Wrong credentials");
      //   setIsInvalid(true);
      //   return;
      // }


    } else {

      //signup

      try{
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password,
            team
          })
        })
        const data = await response.json();

        setIsLoading(false);
        if(response.ok){
          auth.login(data.createdUser.id, data.createdUser.team);
        }
        else{
          setError(data.message);
          setIsInvalid(true);
        }
      }
      catch(err){
        console.log(err);
        setIsLoading(false);
        setError(err.message || 'Username or email exist. Please try again!');
        setIsInvalid(true);
        return;
      }
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
    {isLoading ? <LoadingSpinner/> : null}
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
