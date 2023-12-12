import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserMakeRequest = ({ email }) => {
  const [requestId, setRequestId] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [requestSuccessful, setRequestSuccessful] = useState(false);

  useEffect(() => {
    const fetchRequestId = async () => {
      try {
        const response = await axios.get('/generate_request_id');
        setRequestId(response.data.request_id);
      } catch (error) {
        console.error('Error generating request ID:', error);
      }
    };

    fetchRequestId();
  }, [requestSuccessful]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/Item');
        setItems(response.data.Item);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleItemToggle = (itemId) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(itemId)) {
        return prevItems.filter((item) => item !== itemId);
      } else {
        return [...prevItems, itemId];
      }
    });
  };

  const handleMakeRequest = async () => {
    if (selectedItems.length === 0) {
      // If no items are selected, show an alert
      alert('Please select at least one item before making a request.');
      return;
    }

    try {
      const addRequestResponse = await axios.post('/addRequest', {
        request_id: requestId,
        request_admin: null, 
        request_user: email, 
        pickup_date: null, 
        request_date: null,
      });

      const addRequestStatus = addRequestResponse.data.status;

      if (addRequestStatus === 'true') {
        console.log('Request added successfully!');
        
        const addItemsResponse = await axios.post('/addRequestContains', {
          id_request: requestId,
          request_item: selectedItems,
        });

        const addItemsStatus = addItemsResponse.data.status;

        if (addItemsStatus === 'true') {
          console.log('Items added to the request successfully!');
          alert('Request and Request_Contains inserted successfully!')
          setRequestSuccessful(!requestSuccessful);
        } else {
          alert('Failed to add items to the request.');
          console.error('Failed to add items to the request.');
          setRequestSuccessful(!requestSuccessful);
        }
      } else {
        alert('Failed to create the request.');
        console.error('Failed to create the request.');
        setRequestSuccessful(!requestSuccessful); 
      }
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <p>Unique RequestID: {requestId}</p>
      <h3>Select Items</h3>
      <ul>
        {items.map((item) => (
          <li key={item[0]}>
            <input
              type="checkbox"
              id={`item-${item[0]}`}
              onChange={() => handleItemToggle(item[0])}
              checked={selectedItems.includes(item[0])}
            />
            <label htmlFor={`item-${item[0]}`}>{item[0]}</label>
          </li>
        ))}
      </ul>
      <p>Selected Items: {selectedItems.join(', ')}</p>
      <button onClick={handleMakeRequest}>Make Request</button>
    </div>
  );
};

export default UserMakeRequest;
