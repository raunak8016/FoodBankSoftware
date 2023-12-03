import React from 'react';
import Banner from './Banner';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Items from './Items';

const AdminDashboard = () => {
  // State to manage the visibility of different sections
  const [showOrders, setShowOrders] = useState(false);
  const [showClientDonations, setShowClientDonations] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showFulfillOrders, setShowFulfillOrders] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  const { email } = useParams();
  const navigate = useNavigate();


  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <Banner />
      <div>
        <p>Email Value: {email}</p>
        <h2>Admin Dashboard</h2>
        <button onClick={() => setShowOrders(!showOrders)}>Order from Supplier</button>
        <button onClick={() => setShowClientDonations(!showClientDonations)}>Add Client Donation</button>
        <button onClick={() => setShowAddAdmin(!showAddAdmin)}>Add Admin Account</button>
        <button onClick={() => setShowFulfillOrders(!showFulfillOrders)}>Fulfill/View Requests</button>
        <button onClick={() => setShowInventory(!showInventory)}>View Inventory</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {showOrders && <OrdersSection />}
      {showClientDonations && <ClientDonationsSection />}
      {showAddAdmin && <AddAdminSection />}
      {showFulfillOrders && <FulfillOrdersSection />}
      {showInventory && <InventorySection />}
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
    shiftTime: '', // New field for shift time
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

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

const FulfillOrdersSection = () => {
  return (
    <div>
      <h3>Fulfill Orders Section</h3>
      {/* Add content for fulfilling orders */}
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
