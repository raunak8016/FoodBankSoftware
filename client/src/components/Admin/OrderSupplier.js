import React, { useState } from 'react';

const VerifyUser = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onSubmit prop with the current message
    onSubmit(message);
    // Clear the input after submitting
    setMessage('');
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={{ width: '100%', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}
        />
        <button type="submit" style={{ background: '#4CAF50', color: 'white', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default VerifyUser;