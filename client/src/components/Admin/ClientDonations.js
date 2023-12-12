import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientDonations = () => {
  const [donorEmail, setDonorEmail] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [status, setStatus] = useState(null);

  const handleDonorEmailChange = (e) => {
    setDonorEmail(e.target.value);
  };

  const handleDonationDateChange = (e) => {
    setDonationDate(e.target.value);
  };

  const handleItemSelect = (selectedItemValue) => {
    setSelectedItem(selectedItemValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedItem || !donorEmail.trim()) {
      alert('Please select an item and provide a valid donor email.');
      return;
    }
  
    try {
        console.log(donorEmail, donationDate, selectedItem);
      const response = await axios.post('/addDonation', {
        donor_email: donorEmail,
        donation_date: donationDate,
        item_name: selectedItem,
      });
  
      const status = response.data.status;
    
      if (status === 'true') {
        setStatus('Donation added successfully!');
      } else {
        setStatus(`Failed to add donation.`);
      }
    } catch (error) {
      console.error('Error adding donation:', error);
      setStatus('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Donor Email:
          <input type="text" value={donorEmail} onChange={handleDonorEmailChange} required />
        </label>
        <p></p>
        <br />
        <label>
          Donation Date:
          <input type="date" value={donationDate} onChange={handleDonationDateChange} required />
        </label>
        <p></p>
        <br />
        <label>
          <ItemDropdown onSelect={handleItemSelect} />
        </label>
        <br />
        <button type="submit">Add Donation</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

const ItemDropdown = ({ onSelect }) => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
  
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await axios.get('/Item');
          setItems(response.data.Item || []);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };
  
      fetchItems();
    }, []);
  
    const handleItemChange = (e) => {
      const selectedItemValue = e.target.value;
      setSelectedItem(selectedItemValue);
      onSelect(selectedItemValue);
    };
  
    return (
      <div>
        <label>
          Select Item:
          <select value={selectedItem} onChange={handleItemChange}>
            <option value="" disabled>Select an item</option>
            {items.map((item) => (
              <option key={item[0]} value={item[0]}>
                {item[0]}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  };
  

export default ClientDonations;
