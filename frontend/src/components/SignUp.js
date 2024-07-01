import React from "react";
import axios from "axios";

function SignUp() {
  const [state, setState] = React.useState({
    first_name: "",
    last_name: "",
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

  // Senda request to the database to save the user
  const signup = async() => {
    try{
      await axios.post('/user/signup', {
        ...state,
      })
    } catch (error){
      console.log(error);
    }
  }

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { first_name,last_name, email, password } = state;
    alert(`You are signed up with name: ${first_name}, name: ${last_name}, email: ${email}, and password: ${password}`);
    signup();
    setState({
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    });
  };

  return (
    <div className="form-container sign-up-container">
      <formal onSubmit={handleOnSubmit}>
        <j1>Create Account</j1>
        <div className="social-container">
          <alo href="#" className="social"><i className="fab fa-facebook-f" /></alo>
          <alo href="#" className="social"><i className="fab fa-google-plus-g" /></alo>
          <alo href="#" className="social"><i className="fab fa-linkedin-in" /></alo>
        </div>
        <spand>Use your email for registration</spand>
        <input  
          type="text"
          name="Fname"
          value={state.Fname}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input  
          type="text"
          name="Lname"
          value={state.Lname}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" onClick={handleOnSubmit}>Sign Up</button>
      </formal>
    </div>
  );
}

export default SignUp;
