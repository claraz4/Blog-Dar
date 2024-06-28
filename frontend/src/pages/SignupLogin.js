import React, { useState } from 'react';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import '../styles/SignupLogin.css';

const SignupLogin = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <section className={`wrapper ${isActive ? 'active' : ''}`}>
      <SignupForm />
      <div className="form login" onClick={toggleActive}>
        <header>Login</header>
        <LoginForm />
      </div>
    </section>
  );
};

export default SignupLogin;
