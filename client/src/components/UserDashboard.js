import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import UserMakeRequest from './UserMakeRequest';
import { Link } from 'react-router-dom';

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
      {userInfo && userInfo[0][3] === 1 && (<button onClick={handleMakeRequestClick}>Make/View Request</button>)}
      {userInfo && userInfo[0][7] === 1 && (<button onClick={handleDonateItemsClick}>View Past Donations</button>)}
      
      <button onClick={handleViewInventoryClick}>View Inventory</button>

      {showMakeRequest && <MakeRequest email={email} />}
      {showDonateItems && <DonateItems email={email} />}
      {showViewInventory && <ViewInventory />}
      <p></p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const MakeRequest = ({ email }) => {
  const [requestInfo, setRequestInfo] = useState(null);

  useEffect(() => {
    const fetchRequestInfo = async () => {
      try {
        console.log(`Getting request info for ${email}...`);
        const response = await axios.post('/Request_Info', { user_email: email });
        setRequestInfo(response.data.Info);
        console.log(response.data.Info);
      } catch (error) {
        console.error('Error fetching request information:', error);
      }
    };

    fetchRequestInfo();
  }, [email]); 

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
      <h2>Hamper Request</h2>
      <h3>Make Request:</h3>
      <UserMakeRequest email={email} />
      <h3>Past Requests:</h3>
      {requestInfo ? (
        <table style={{ border: '1px solid #ccc', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Request ID</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Request User</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Ready Date</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {requestInfo.map((request, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <Link to={`/request-details/${request[0]}`} target="_blank">
                    {request[0]}
                  </Link>
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{request[2]}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {formatDateString(request[3])}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {formatDateString(request[4])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading request information...</p>
      )}
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
            
            <p>Verified: {userInfo[0][6] !== null && userInfo[0][6] !== '' ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    );
};

const DonateItems = ({ email }) => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch past donations when the component mounts
    const fetchDonations = async () => {
      try {
        console.log(`Getting donations for ${email}...`);
        const response = await axios.post('/getDonation', { donor_email: email });
        const formattedDonations = response.data[`Donations By: ${email}`].map(donation => {
          // Convert the date part without time
          const dateWithoutTime = new Date(donation[1]).toISOString().split('T')[0];
          return [donation[0], dateWithoutTime];
        });
        setDonations(formattedDonations);
        console.log(formattedDonations);
      } catch (error) {
        console.error('Error fetching past donations:', error);
      }
    };

    fetchDonations();
  }, [email]); // Fetch past donations when the donor email changes

  return (
    <div>
      <h2>View Past Donations</h2>
      <table style={{ border: '1px solid #ccc', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Item</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Donation Date</th>
          </tr>
        </thead>
        <tbody>
          {donations && donations.map((donation, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{donation[0]}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{donation[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
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