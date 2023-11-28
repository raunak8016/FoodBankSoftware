import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from './Banner'; // Import the Banner component

const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('client');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSignup = () => {
    // Implement your signup logic here
    console.log('Signup details:', { email, firstName, lastName, userType, address });
  };

  const handleBack = () => {
    // Navigate back to the home page (/)
    navigate('/');
  };

  return (
    <div>
      <Banner />
      <h2>User Signup</h2>
      <div>
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
      </div>
      <div>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
      </div>
      <div>
        <label>
          User Type:
          <select value={userType} onChange={handleUserTypeChange}>
            <option value="client">Client</option>
            <option value="donor">Donor</option>
          </select>
        </label>
      </div>
      {userType === 'client' && (
        <div>
          <label>
            Address:
            <input type="text" value={address} onChange={handleAddressChange} />
          </label>
        </div>
      )}
      <div>
        <button onClick={handleSignup}>Signup</button>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default Signup;