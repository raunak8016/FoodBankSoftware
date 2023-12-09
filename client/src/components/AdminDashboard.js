import React from 'react';
import Banner from './Banner';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Items from './Items';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Unified state for managing the visibility of different sections
  const [showSection, setShowSection] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);

  const { email } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  // Function to close all sections
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
        <button onClick={() => setShowSection('clientDonations')}>Add Client Donation</button>
        {adminInfo && adminInfo[0][4] === 1 && (
          <button onClick={() => setShowSection('addAdmin')}>Add Admin Account</button>
        )}
        <button onClick={() => setShowSection('fulfillOrders')}>Fulfill/View Requests</button>
        <button onClick={() => setShowSection('inventory')}>View Inventory</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {/* Render sections based on the showSection state */}
      {showSection === 'orders' && <OrdersSection closeAllSections={closeAllSections} />}
      {showSection === 'clientDonations' && <ClientDonationsSection closeAllSections={closeAllSections} />}
      {showSection === 'addAdmin' && <AddAdminSection closeAllSections={closeAllSections} />}
      {showSection === 'fulfillOrders' && <FulfillOrdersSection closeAllSections={closeAllSections} />}
      {showSection === 'inventory' && <InventorySection closeAllSections={closeAllSections} />}
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
          <p>Shift: {adminInfo[0][3]}</p>
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




// Example section components (you can replace these with your actual components)
const OrdersSection = () => {
  return (
    <div>
      <h3>Orders Section</h3>
      {/* Add content for viewing orders */}
    </div>
  );
};

const ClientDonationsSection = () => {
  return (
    <div>
      <h3>Client Donations Section</h3>
      {/* Add content for viewing client donations */}
    </div>
  );
};

const AddAdminSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    adminType: 'volunteer',
    shiftTime: '',
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
        // Handle the response from the server as needed
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
          name="shiftTime"
          value={formData.shiftTime}
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

const FulfillOrdersSection = () => {
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    // Fetch data from Flask backend using Axios
    const fetchRequestData = async () => {
      try {
        const response = await axios.get('/Request');
        setRequestList(response.data.Request);
      } catch (error) {
        console.error('Error fetching request data:', error);
      }
    };

    fetchRequestData();
  }, []); // Fetch data when the component is loaded

  return (
    <div>
      <h2>Request List</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Request Admin</th>
            <th>Request User</th>
            <th>Pickup Date</th>
            <th>Request Date</th>
          </tr>
        </thead>
        <tbody>
          {requestList.map((request) => (
            <tr key={request[0]}>
              <td>
                {/* Link each request_id to another page */}
                <Link to={`/request_contains/${request[0]}`}>{request[0]}</Link>
              </td>
              <td>{request[1] ? 'Yes' : 'No'}</td>
              <td>{request[2]}</td>
              <td>{request[3]}</td>
              <td>{request[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default AdminDashboard;
