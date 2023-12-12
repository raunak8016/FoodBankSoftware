import React from 'react';
import Banner from './Banner';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Items from './Items';
import { Link } from 'react-router-dom';
import VerifyUser from './Admin/VerifyUser';
import ClientDonations from './Admin/ClientDonations';
import OrderSupplier from './Admin/OrderSupplier';
import OrdersTable from './Admin/OrdersTable';

const AdminDashboard = () => {
  const [showSection, setShowSection] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const { email } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const closeAllSections = () => {
    setShowSection(null);
  };

  useEffect(() => {
    axios.post('/Admin_Info', { a_email: email })
      .then(response => {
        setAdminInfo(response.data.Info);
      })
      .catch(error => {
        console.error('Error fetching admin information:', error);
      });
  }, [email]);

  return (
    <div>
      <Banner />
      <div>
        <p></p>
        <AdminProfile email={email} />
        <button onClick={() => setShowSection('orders')}>Order from Supplier</button>
        <button onClick={() => setShowSection('clientDonations')}>Add Client Donations</button>
        {adminInfo && adminInfo[0][4] === 1 && (
          <button onClick={() => setShowSection('addAdmin')}>Add Admin Account</button>
        )}
        <button onClick={() => setShowSection('fulfillOrders')}>Fulfill/View Requests</button>
        <button onClick={() => setShowSection('inventory')}>View/Edit Inventory</button>
        <button onClick={() => setShowSection('verifyUser')}>Verify/Check User</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {showSection === 'orders' && <OrdersSection email={email} closeAllSections={closeAllSections} />}
      {showSection === 'clientDonations' && <ClientDonationsSection closeAllSections={closeAllSections} />}
      {showSection === 'addAdmin' && <AddAdminSection closeAllSections={closeAllSections} />}
      {showSection === 'fulfillOrders' && <FulfillOrdersSection email={email} closeAllSections={closeAllSections} />}
      {showSection === 'inventory' && <InventorySection closeAllSections={closeAllSections} />}
      {showSection === 'verifyUser' && <VerifyUserSection email={email} closeAllSections={closeAllSections} />}
    </div>
  );
};

const AdminProfile = ({ email }) => {
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    axios.post('/Admin_Info', { a_email: email })
      .then(response => {
        setAdminInfo(response.data.Info);
      })
      .catch(error => {
        console.error('Error fetching admin information:', error);
      });
  }, [email]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h2>Admin Profile</h2>
      {adminInfo ? (
        <div>
          <p>Email: {adminInfo[0][0]}</p>
          <p>Name: {adminInfo[0][1]} {adminInfo[0][2]}</p>
          <p>Shifts: {adminInfo[0][3]}</p>
          {adminInfo[0][4] === 1 && <p>Coordinator: Yes</p>}
          {adminInfo[0][5] === 1 && <p>Volunteer: Yes</p>}
          <p>Manager Email: {adminInfo[0][6]}</p>
        </div>
      ) : (
        <p>Loading admin information...</p>
      )}
    </div>
  );
};




const OrdersSection = ({email}) => {
  return (
    <div>
      <h3>Orders Section</h3>
      <OrderSupplier email={email}/>
      <OrdersTable/>
    </div>
  );
};

const ClientDonationsSection = () => {
  return (
    <div>
      <h3>Client Donations Section</h3>
      <ClientDonations/>
    </div>
  );
};

const AddAdminSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    adminType: 'volunteer',
    shift: '',
    managerEmail: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios.post('/admin_signUp', formData)
      .then(response => {
        console.log(response.data);
        

        const success = response.data.status;

        if (success === "true") {
          alert("Add new admin successful!");
        } else {
          const reason = response.data.reason;
          alert("Add admin failed. " + reason);
          console.log("faliure reason:", reason);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Signup failed. Please try again.");
      });
  };

  return (
    <div>
      <h3>Add Admin Account Section</h3>
      <form>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label>Admin Type:</label>
        <select name="adminType" value={formData.adminType} onChange={handleChange}>
          <option value="volunteer">Volunteer</option>
          <option value="coordinator">Coordinator</option>
        </select>

        <label>Shift Time:</label>
        <textarea
          name="shift"
          value={formData.shift}
          onChange={handleChange}
          placeholder="Enter your weekly schedule (e.g., Mon-06:00-15:00, Tue-09:00-17:00)"
        />

        <label>Manager Email:</label>
        <input
          name="managerEmail"
          value={formData.managerEmail}
          onChange={handleChange}
        />

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

const FulfillOrdersSection = ({email}) => {
  const [requestInfo, setRequestInfo] = useState([]);

  const fetchRequestInfo = async () => {
    try {
      console.log(`Getting request info...`);
      const response = await axios.post('/Request');
      setRequestInfo(response.data.Request || []);
    } catch (error) {
      console.error('Error fetching request information:', error);
    }
  };

  useEffect(() => {
    fetchRequestInfo();
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

  const handleFulfillClick = async (requestId) => {
    try {
      const response = await axios.post('/updateRequest', {
        request_id: requestId,
        admin_email: email,
      });

      const updateStatus = response.data.status;

      if (updateStatus === 'true') {
        console.log(`Request ${requestId} fulfilled successfully!`);
        fetchRequestInfo();
      } else {
        console.error(`Failed to fulfill request ${requestId}.`);
        alert('failed to fulfill request')
      }
    } catch (error) {
      console.error('Error fulfilling request:', error);
    }
  };

  return (
    <div>
      <h2>Request List</h2>
      {requestInfo.length > 0 ? (
        <table style={{ border: '1px solid #ccc', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Request ID</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Request Admin</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Request User</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Ready Date</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Request Date</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
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
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{request[1]}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{request[2]}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {formatDateString(request[3])}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {formatDateString(request[4])}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {request[3] === null || request[3] === '' ? (
                    <button onClick={() => handleFulfillClick(request[0])}>Fulfill</button>
                  ) : (
                    'Already Fulfilled'
                  )}
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


const InventorySection = () => {
  return (
    <div>
      <Items/>
    </div>
  );
};

const VerifyUserSection = ({email}) => {
  return (
    <div>
      <VerifyUser email={email}/>
    </div>
  );
};

export default AdminDashboard;
