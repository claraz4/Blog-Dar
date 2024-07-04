import React from "react";
import axios from "axios";
import useSignup from "../hooks/useSignup";

function SignUp({ isPhone, type, handleOnClick }) {
  const [state, setState] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const { signup, error } = useSignup();

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { first_name, last_name, email, password } = state;
    // alert(`You are signed up with name: ${first_name}, name: ${last_name}, email: ${email}, and password: ${password}`);
    signup(state);

    if (error === "") {
      setState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="sign-in-up-form" onSubmit={handleOnSubmit}>
        <h1 className="sign-in-up-title">Create Account</h1>
        {/* <span className="sign-in-up-span">Use your email for registration</span> */}
        <input
          type="text"
          name="first_name"
          value={state.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="input-sign-in-up"
        />
        <input
          type="text"
          name="last_name"
          value={state.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="input-sign-in-up"
        />
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
        {error !== "" && <p className="account-error" style={{ alignSelf: "flex-start", marginTop: "5px" }}>{error}</p>}
        <button
          type="submit"
          onClick={handleOnSubmit}
          className="sign-in-up-button"
        >
          Sign Up
        </button>
        {isPhone && type === "signUp" && (
          <button
            className="sign-in-up-button"
            style={{
              border: "2px rgb(4, 170, 109) solid",
              color: "rgb(4, 170, 109)",
              backgroundColor: "transparent",
            }}
            type="button"
            onClick={() => handleOnClick("signIn")}
          >
            Click to Sign In
          </button>
        )}
      </form>
    </div>
  );
}

export default SignUp;
