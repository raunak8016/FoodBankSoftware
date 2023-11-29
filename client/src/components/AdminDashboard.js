import React from 'react';
import Banner from './Banner';

import { useState } from 'react';


const AdminDashboard = ({email, handleLogout}) => {
  return (
    <div>
      <Banner />
      <div>
        <h2>Admin Dashboard</h2>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
