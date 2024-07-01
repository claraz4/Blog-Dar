import React, { useState } from 'react';
import '../styles/LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    
    const formData = {
      username,
      password,
    };

    try {
      const response = await fetch('/api/login_process.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        
        console.log('Login successful');
      } else {
        
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form login">
      <header>Login</header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <a href="#">Forgot password?</a>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
