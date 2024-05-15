import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import contactCSS from './Contact.module.css';
import Navbar from '../Navbar/Navbar';

function Contact() {
  // Retrieve username from local storage
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [message, setMessage] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          message: message
        })
      });

      const responseData = await response.json();
      if (response.ok) {
        setSubmitMessage('Message recorded successfully!');
      } else {
        setSubmitMessage('An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('An error occurred.');
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className={contactCSS.pageWrapper}>
      <div className={contactCSS.top}>
        <Navbar />
      </div>
      <div className={contactCSS.left}></div>
      <div className={contactCSS.right}>
        <div className={contactCSS.cardContainer}>
          <div className={contactCSS.card}>
            <h1 style={{ marginBottom: '80px', color: '#006' }}>Contact Us</h1>
            <form className={contactCSS.loginForm} onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                style={{ color: 'gray' }}
                required
                disabled
              />
              <input
                type="text"
                placeholder="Message"
                style={{ height: '100px' }}
                value={message}
                onChange={handleMessageChange}
                required
              />
              <button type="submit" className={contactCSS.loginButton}>Submit</button>
            </form>
            {submitMessage && <p style={{ textAlign: 'center' }}>{submitMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
