import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import signupCSS from './Signup.module.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, Gender: gender, Age: age })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.text();
      setMessage(data);
      if (data === 'User created successfully') {
        // Redirect to Login page or show a success message
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An unexpected error occurred');
    }
  };

  return (
    <div className={signupCSS.pageWrapper}>
      <div className={signupCSS.top}></div>
      <div className={signupCSS.left}></div>

      <div className={signupCSS.right}>
        <div className={signupCSS.cardContainer}>
          <div className={signupCSS.card}>
            <h1 style={{ marginBottom: '80px', color: '#006' }}>Sign Up</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <form className={signupCSS.signupForm} onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className={signupCSS.inlineFields}>
                <input
                  type="text"
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className={signupCSS.signupButton}>Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
