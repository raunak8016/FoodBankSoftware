import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [userType, setUserType] = useState('');

  const [showMakeRequest, setShowMakeRequest] = useState(false);
  const [showDonateItems, setShowDonateItems] = useState(false);
  const [showViewInventory, setShowViewInventory] = useState(false);

  const { email } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    // Fetch user type from Flask backend using Axios
    const fetchUserType = async () => {
      try {
        const response = await axios.post('/getUsertype', { email });
        setUserType(response.data.usertype);
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };

    fetchUserType();
  }, [email]); // Fetch user type when the component is loaded and email changes


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
      <p>Email Value: {email}</p>
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
  const [date, setDate] = useState('');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };


  return (
    <div>
      <h3>Make Request Component</h3>
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