import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ItemsinOrder = () => {
  const { orderNo } = useParams();
  const [requestItems, setRequestItems] = useState([`Order: ${orderNo}`]);

  useEffect(() => {
    console.log('orderNo:', orderNo)
    const fetchRequestItems = async () => {
      try {
        const response = await axios.post('/OrderContains', { order_id: orderNo });
        console.log('response.data:', response.data)
        setRequestItems(response.data[`Order: ${orderNo}`]);
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    fetchRequestItems();
  }, [orderNo]);

  return (
    <div>
      <h2>Order Details</h2>
      <h3>Items in Order {orderNo}:</h3>
      <p>{requestItems.join(', ')}</p>
    </div>
  );
};

export default ItemsinOrder;
