import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderSupplier = ({ email }) => {
  const [deliveryDate, setDeliveryDate] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const suppliersResponse = await axios.post('/Supplier');
        setSuppliers(suppliersResponse.data.Supplier || []);

        const itemsResponse = await axios.get('/Item');
        setItems(itemsResponse.data.Item || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeliveryDateChange = (e) => {
    setDeliveryDate(e.target.value);
  };

  const handleSupplierChange = (e) => {
    setSupplierId(e.target.value);
  };

  const handleItemToggle = (itemId) => {
    const updatedItems = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];

    setSelectedItems(updatedItems);
    console.log(updatedItems);
  };

  const handleAddOrder = async () => {
    try {
      const response = await axios.post('/addOrder', {
        delivery_date: deliveryDate,
        admin_email: email,
        supplier_id: supplierId,
        items: selectedItems,
      });

      const { status, reason } = response.data;

      if (status === 'true') {
        setStatus('Order added successfully!');
      } else {
        setStatus(`Failed to add order: ${reason}`);
      }
    } catch (error) {
      console.error('Error adding order:', error);
      setStatus('An unexpected error occurred.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
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
      <label>
        Items:
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
      </label>
      <br />
      <p></p>
      <button onClick={handleAddOrder}>Add Order</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default OrderSupplier;
