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
    "sign-in-up--container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
      <j2>Sign in/up Form</j2>
      <div className={containerClass} id="container">
        <SignUp />
        <SignIn />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <j1>Welcome Back!</j1>
              <par>
                To keep connected with us please login with your personal info
              </par>
              <button
                className="ghost sign-in-up-button"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <j1>Hello, Friend!</j1>
              <par>Enter your personal details and start journey with us</par>
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