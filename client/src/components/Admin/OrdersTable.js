import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post('/Order');
        setOrders(response.data.Order || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const formatDateString = (dateString) => {
    console.log(dateString);
    if (dateString) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
  
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
    return ''; 
  };


  return (
    <div>
      <h2>Orders</h2>
      <table style={{ border: '1px solid #ccc', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Order No</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Delivery Date</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Admin Email</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Supplier ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <Link to={`/order-details/${order[0]}`} target="_blank">
                  {order[0]}
                </Link>
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{formatDateString(order[1])}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order[2]}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{order[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
