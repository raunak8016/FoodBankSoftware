import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState('');

  const [showMakeRequest, setShowMakeRequest] = useState(false);
  const [showDonateItems, setShowDonateItems] = useState(false);
  const [showViewInventory, setShowViewInventory] = useState(false);

  const { email } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    axios.post('/User_Info', { u_email: email })
      .then(response => {
        setUserInfo(response.data.Info);
        console.log(response.data.Info);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
      });
  }, [email]);

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
      <p></p>
      <UserProfile email={email} />
      {userInfo && userInfo[0][3] === 1 && (<button onClick={handleMakeRequestClick}>Make Request</button>)}
      {userInfo && userInfo[0][7] === 1 && (<button onClick={handleDonateItemsClick}>View Past Donations</button>)}
      
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
      <div>
        <h2>Hamper Request</h2>

        <p>Select your preferred pickup date for your pickup:</p>
        <input type="date" value={date} onChange={handleDateChange}></input>
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

const UserProfile = ({ email }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios.post('/User_Info', { u_email: email })
      .then(response => {
        setUserInfo(response.data.Info);
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
      });
  }, [email]);


  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h2>User Profile</h2>
      {userInfo ? (
        <div>
          <p>Email: {userInfo[0][0]}</p>
          <p>Name: {userInfo[0][1]} {userInfo[0][2]}</p>
          

          {userInfo[0][3] === 1 && <p>Type: Client</p>}
          {userInfo[0][7] === 1 && <p>Type: Donor</p>}
          
          <p>Address: {userInfo[0][4]}</p>
          
          {/* Display 'Yes' for verified email if the value is not null or '' */}
          <p>Verified: {userInfo[0][6] !== null && userInfo[0][6] !== '' ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};


const DonateItems = ({ email }) => {
  return (
    <div>
      <h3>Past Donations</h3>
      {/* Add content for donating items */}
    </div>
  );
};

const ViewInventory = () => {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('/Item')
      .then(response => {
        setItemData(response.data.Item);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h3>Inventory</h3>
      <table className="items-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Storage Type</th>
            <th>Brand</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {itemData.map((item, index) => (
            <tr key={index}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4] ? 'food' : 'toiletry'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default UserDashboard;