import React from "react";
import { Navigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function SignIn({ isPhone, type, handleOnClick }) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const { login, error } = useLogin();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
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

        <div className="write-blog-title--container">
          <input
            type="text"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            className="input-sign-in-up"
          />
          <p className="asterix">*</p>
        </div>

        <div className="write-blog-title--container">
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            className="input-sign-in-up"
          />
          <p className="asterix">*</p>
        </div>

        {error !== "" && (
          <p
            className="account-error"
            style={{ alignSelf: "flex-start", marginTop: "5px" }}
          >
            {error}
          </p>
        )}
        <button type="submit" className="sign-in-up-button">
          Sign In
        </button>
        {isPhone && type === "signIn" && (
          <button
            style={{
              border: "2px rgb(4, 170, 109) solid",
              color: "rgb(4, 170, 109)",
              backgroundColor: "transparent",
            }}
            className="sign-in-up-button"
            onClick={() => handleOnClick("signUp")}
          >
            Click to Sign Up
          </button>
        )}
      </form>
    </div>
  );
}

export default SignIn;
