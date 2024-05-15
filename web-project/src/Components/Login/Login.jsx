  import React, { useState } from 'react';
  import { NavLink } from "react-router-dom";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import loginCSS from './Login.module.css';

  function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.text();
        setMessage(data);
        if (data === 'Logged in') {

          localStorage.setItem('username', username);
          // Redirect to Home page after successful login
          window.location.href = "/Home";
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An unexpected error occurred');
      }
    };

    return (
      <div className={loginCSS.pageWrapper}>

        <div className={loginCSS.top}></div>
        <div className={loginCSS.left}>
        </div>


        <div className={loginCSS.right}>
          <div className={loginCSS.cardContainer}>
            <div className={loginCSS.card}>
              <h1 style={{ marginBottom: '80px', color: '#006' }}>Login</h1>
              {message && <div className="alert alert-info">{message}</div>}
              <form className={loginCSS.loginForm} onSubmit={handleLogin}>
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
                <button type="submit" className={loginCSS.loginButton}>Login</button>
              </form>
              <NavLink className={loginCSS.signup} to="/Signup">Sign Up</NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Login;
