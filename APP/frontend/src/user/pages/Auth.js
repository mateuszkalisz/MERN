import React, { useState } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";

import Button from "../../shared/components/FormElements/Button";

import "./Auth.css";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const switchAuthFormHandler = () => {

    if(!isLoginMode){
        setFormData({
            ...formState,
            name: undefined
        }, formState.inputs.email.isValid && formState.inputs.password.isValid)
    }
    else{
        setFormData({
            ...formState.inputs,
            name: {
                value: '',
                isValid: false,
            }
        }, false)
    }

    setIsLoginMode(prevMode => !prevMode);
    //   console.log(isLoginMode);
  };

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); //send this to the backend
  };

  return (
    <>
      <div className="auth">
        <h1>Login required</h1>
        <form className="auth-form" onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your name"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="text"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password (at least 8 characters)"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchAuthFormHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </div>
    </>
  );
};

export default Auth;
