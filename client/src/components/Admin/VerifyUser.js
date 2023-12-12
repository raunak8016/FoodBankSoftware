import React, { useState } from 'react';
import axios from 'axios';

const VerifyUser = ({email}) => {
  const [userEmail, setUserEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };


  const handleVerifyAdmin = async () => {
    try {
      const response = await axios.post('/updateVerifyAdmin', {
        user_email: userEmail,
        admin_email: email,
      });

      const status = response.data.status;

      if (status === 'true') {
        setStatus('Verification updated successfully!');
      } else if (status === 'already') {
        setStatus(`User is already verified.`);
      } else {
        setStatus(`Failed to update verification.`);
      }
    } catch (error) {
      console.error('Error updating verification:', error);
      setStatus('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h2>Enter User Email to verify their account or check if they are already verified.</h2>
      <label>
        User Email:
        <input type="text" value={userEmail} onChange={handleUserEmailChange} required />
      </label>
      <br />
      <p></p>
      <button onClick={handleVerifyAdmin}>Verify User</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default VerifyUser;
