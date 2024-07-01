// SignupForm.js
import React, { useState } from 'react';
import '../styles/SignupForm.css'; // Ensure to create and link your CSS file for styling
import LoginForm from './LoginForm';

const SignupForm = ({ history }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Example: Form validation
    if (!fullName || !username || !password || !gender || !dobDay || !dobMonth || !dobYear || !termsAccepted) {
      alert('Please fill in all fields and accept terms & conditions.');
      return;
    }

    // Example: Simulate form submission process
    console.log('Form submitted:', {
      fullName,
      username,
      password,
      gender,
      dobDay,
      dobMonth,
      dobYear,
      termsAccepted,
    });

    // Redirect to another page after successful signup (example)
    history.push('/login');
  };

  return (
    <section className="wrapper">
      <div className="form signup">
        <header>Signup</header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            name="Username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
          <div className="dob-select">
            <select
              name="dob_day"
              value={dobDay}
              onChange={(e) => setDobDay(e.target.value)}
              required
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>

            <select
              name="dob_month"
              value={dobMonth}
              onChange={(e) => setDobMonth(e.target.value)}
              required
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {new Date(0, index).toLocaleString('en-US', { month: 'long' })}
                </option>
              ))}
            </select>

            <select
              name="dob_year"
              value={dobYear}
              onChange={(e) => setDobYear(e.target.value)}
              required
            >
              <option value="">Year</option>
              {Array.from({ length: 100 }, (_, index) => (
                <option key={index + 1} value={new Date().getFullYear() - index}>
                  {new Date().getFullYear() - index}
                </option>
              ))}
            </select>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="signupCheck"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <label htmlFor="signupCheck">I accept all terms & conditions</label>
          </div>
          <input type="submit" value="Signup" />
        </form>
      </div>

      <LoginForm />
    </section>
  );
};

export default SignupForm;
