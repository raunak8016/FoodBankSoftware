import React from 'react';
import Banner from './Banner';
import { useState } from 'react';

const AdminDashboard = ({ email, handleLogout }) => {
  // State to manage the visibility of different sections
  const [showOrders, setShowOrders] = useState(false);
  const [showClientDonations, setShowClientDonations] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showFulfillOrders, setShowFulfillOrders] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  return (
    <div>
      <Banner />
      <div>
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
  return (
    <div>
      <h3>Add Admin Account Section</h3>
      {/* Add content for adding admin accounts */}
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
      <h3>Inventory Section</h3>
    </div>
  );
};

export default AdminDashboard;
