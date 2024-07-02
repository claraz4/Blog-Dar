import React from "react";
import { Navigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function SignIn({ isPhone, type, handleOnClick }) {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const { login } = useLogin();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    login(state);
  };

  return (
    <div className="form-container sign-in-container">
      <form className="sign-in-up-form" onSubmit={handleOnSubmit}>
        <h1 className="sign-in-up-title">Sign In</h1>
        {/* <span className="sign-in-up-span">Use your account</span> */}
        <input 
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="input-sign-in-up"
        />
        <input 
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="input-sign-in-up"
        />

        <button type="submit" className="sign-in-up-button">Sign In</button>
        {isPhone && type === "signIn" && 
          <button
          style={{ 
            "border": "2px rgb(4, 170, 109) solid", "color":'rgb(4, 170, 109)', "backgroundColor":'transparent' }}
            className="sign-in-up-button"
            onClick={() => handleOnClick("signUp")}
          >
            Click to Sign Up
          </button>
        }
      </form>
    </div>
  );
}

export default SignIn;
