import React from "react";

function SignIn() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are logged in with email: ${email} and password: ${password}`);

    setState({
      email: "",
      password: ""
    });
  };

  return (
    <div className="form-container sign-in-container">
      <formal onSubmit={handleOnSubmit}>
        <j1>Sign In</j1>
        <div className="social-container">
          <alo href="#" className="social"><i className="fab fa-facebook-f" /></alo>
          <alo href="#" className="social"><i className="fab fa-google-plus-g" /></alo>
          <alo href="#" className="social"><i className="fab fa-linkedin-in" /></alo>
        </div>
        <spand>Use your account</spand>
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
        <a href="#">Forgot your password?</a>
        <button type="submit" className="sign-in-up-button">Sign In</button>
      </formal>
    </div>
  );
}

export default SignIn;
