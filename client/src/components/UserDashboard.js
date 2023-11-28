import React from 'react';
import Banner from './Banner';
import Calendar from 'react-calendar';

const UserDashboard = () => {
  return (
    <div>
      <Banner/>
      <h2>User Dashboard</h2>
      <p>Welcome to your dashboard!</p>

      <div>
        <h2>Hamper Request</h2>
        <p>Select your preferred pickup date: </p>

        <Calendar/>

        <p>Please keep in mind that being more than 15 minutes late will require you
          to reschedule your pickup. If you do not reschedule, your hamper will be unpacked,
          and you will be required to wait 30 days until your next request.
        </p>
        <p>Please select which items you</p>
      </div>
    </div>
  );
};

export default UserDashboard;
