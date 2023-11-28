import React, { useState } from 'react';
import Banner from './Banner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [userType, setUserType] = useState('user');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();


  const handleToggle = () => {
    setUserType((prevType) => (prevType === 'user' ? 'admin' : 'user'));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLogin = () => {
    // Implement your login logic here
    try {
        // Assuming successful login logic here
  
        // Navigate to the dashboard
        navigate('/user_dashboard');
      } catch (error) {
        console.error('Error during login:', error);
        // Handle error, show an error message, etc.
      }
  };

  const handleSignup = () => {
    // Implement your signup logic here
    console.log(`Signing up as ${userType} with email: ${email}`);
  };

  return (
    <div>
      <Banner />
      <h1>Login/Signup Page</h1>
      <div>
        <label>
          User Type:
          <button onClick={handleToggle}>{userType}</button>
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
};

export default App;