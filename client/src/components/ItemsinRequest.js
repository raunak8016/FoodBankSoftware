import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RequestDetails = () => {
  const { requestId } = useParams();
  const [requestItems, setRequestItems] = useState([]);

  useEffect(() => {
    const fetchRequestItems = async () => {
      try {
        const response = await axios.post('/RequestContains', { request_id: requestId });
        setRequestItems(response.data[`Request: ${requestId}`]);
      } catch (error) {
        console.error('Error fetching request items:', error);
      }
    };

    fetchRequestItems();
  }, [requestId]);

  return (
    <div>
      <h2>Request Details</h2>
      <h3>Items in Request {requestId}:</h3>
      <p>{requestItems.join(', ')}</p>
    </div>
  );
};

export default RequestDetails;
