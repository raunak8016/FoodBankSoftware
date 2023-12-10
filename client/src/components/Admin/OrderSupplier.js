import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderSupplier = ({ email }) => {
    const [deliveryDate, setDeliveryDate] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const [status, setStatus] = useState(null);
  
    useEffect(() => {
      const fetchSuppliers = async () => {
        try {
          const response = await axios.post('/Supplier');
          setSuppliers(response.data.Supplier || []);
        } catch (error) {
          console.error('Error fetching suppliers:', error);
        }
      };
  
      fetchSuppliers();
    }, []);
  
    const handleDeliveryDateChange = (e) => {
      setDeliveryDate(e.target.value);
    };

  
    const handleSupplierChange = (e) => {
      setSupplierId(e.target.value);
    };
  
    const handleAddOrder = async () => {
      try {
        const response = await axios.post('/addOrder', {
          delivery_date: deliveryDate,
          admin_email: email,
          supplier_id: supplierId,
        });
  
        const { status, reason } = response.data;
  
        if (status === 'true') {
          // Order added successfully
          setStatus('Order added successfully!');
        } else {
          // Error adding order
          setStatus(`Failed to add order: ${reason}`);
        }
      } catch (error) {
        console.error('Error adding order:', error);
        setStatus('An unexpected error occurred.');
      }
    };
  
    return (
      <div>
        <h4>Add Order</h4>
        <label>
          Delivery Date:
          <input type="date" value={deliveryDate} onChange={handleDeliveryDateChange} required />
        </label>
        <p></p>
        <br />
        <label>
          Supplier:
          <select value={supplierId} onChange={handleSupplierChange} required>
            <option value="" disabled>Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier[0]} value={supplier[0]}>
                {`${supplier[1]}, id=${supplier[0]}`}
              </option>
            ))}
          </select>
        </label>
        <br />
        <p></p>
        <button onClick={handleAddOrder}>Add Order</button>
        {status && <p>{status}</p>}
      </div>
    );
  };

export default OrderSupplier;