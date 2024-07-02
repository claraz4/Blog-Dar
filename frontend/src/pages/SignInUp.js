import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function SignInUp() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "sign-in-up--container" + (type === "signUp" ? " right-panel-active" : "");
    
  return (
    <div className="sign-in-up--big-container">
      <h2 className="align-center">Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUp />
        <SignIn />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="sign-in-up-opening">Welcome Back!</h1>
              <p className="sign-in-up-p">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost sign-in-up-button"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="sign-in-up-opening">Hello, Friend!</h1>
              <p className="sign-in-up-p">Enter your personal details and start journey with us</p>
              <button
                className="ghost sign-in-up-button"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}