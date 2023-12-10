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
        // Verification updated successfully
        setStatus('Verification updated successfully!');
      } else if (status === 'already') {
        // Already verified
        setStatus(`User is already verified.`);
      } else {
        // Error updating verification
        setStatus(`Failed to update verification.`);
      }
    } catch (error) {
      console.error('Error updating verification:', error);
      setStatus('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <h2>Verify Admin</h2>
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
