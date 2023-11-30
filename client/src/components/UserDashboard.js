import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import axios from 'axios';

const UserDashboard = ({ email, handleLogout }) => {
  const [date, setDate] = useState('');
  const [userType, setUserType] = useState('');

  const [showMakeRequest, setShowMakeRequest] = useState(false);
  const [showDonateItems, setShowDonateItems] = useState(false);
  const [showViewInventory, setShowViewInventory] = useState(false);

  useEffect(() => {
    // Fetch user type from Flask backend using Axios
    const fetchUserType = async () => {
      try {
        const response = await axios.post('/getUsertype', { email }); // Replace '/getUsertype' with your actual endpoint
        setUserType(response.data.usertype);
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };

    fetchUserType();
  }, [email]); // Fetch user type when the component is loaded and email changes

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleMakeRequestClick = () => {
    setShowMakeRequest(true);
    setShowDonateItems(false);
    setShowViewInventory(false);
  };

  const handleDonateItemsClick = () => {
    setShowMakeRequest(false);
    setShowDonateItems(true);
    setShowViewInventory(false);
  };

  const handleViewInventoryClick = () => {
    setShowMakeRequest(false);
    setShowDonateItems(false);
    setShowViewInventory(true);
  };

  return (
    <div>
      <Banner />
      <div>
        <h2>Hamper Request</h2>

        <p>Select your preferred pickup date for your pickup:</p>
        <input type="date" value={date} onChange={handleDateChange}></input>

        <p>
          Please keep in mind that being more than 15 minutes late will require you
          to reschedule your pickup. <br /> If you do not reschedule, your hamper will be unpacked,
          and you will be required to wait 30 days until your next request.
        </p>

        <p>Please select which items you would like.</p>

        <p>
          The following items are running low or missing, so be aware they might not be
          included in your hamper:
        </p>
        <p label="low/missing"></p>
      </div>

      <button onClick={handleMakeRequestClick}>Make Request</button>
      <button onClick={handleDonateItemsClick}>Donate Items</button>
      <button onClick={handleViewInventoryClick}>View Inventory</button>

      {showMakeRequest && <MakeRequest email={email} />}
      {showDonateItems && <DonateItems email={email} />}
      {showViewInventory && <ViewInventory />}
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const MakeRequest = ({ email }) => {
  return (
    <div>
      <h3>Make Request Component</h3>
      {/* Add content for making a request */}
    </div>
  );
};


const DonateItems = ({ email }) => {
  return (
    <div>
      <h3>Donate Items Component</h3>
      {/* Add content for donating items */}
    </div>
  );
};

const ViewInventory = () => {
  return (
    <div>
      <h3>View Inventory Component</h3>
      {/* Add content for viewing inventory */}
    </div>
  );
};


export default UserDashboard;