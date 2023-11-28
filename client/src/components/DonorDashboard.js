import React from 'react';
import Banner from './Banner';

const DonorDashboard = () => {
  return (
    <div>
      <Banner/>
      <h2>User Dashboard</h2>
      <p>Welcome to your dashboard!</p>

      <div>
        <h2>Donate</h2>
        <p>Thank you for considering donating! We greatly appreciate anything you donate
          (as long as it's not expired!), but if you'd like to maximise your impact, have
          a look at what we're low on or missing below:
        </p>
      </div>
    </div>
  );
};

export default DonorDashboard;
