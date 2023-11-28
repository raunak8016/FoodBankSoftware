import React from 'react';
import Banner from './Banner';

import { useState } from 'react';

const UserDashboard = () => {

  const [date, setDate] = useState('')

  const handleDateChange = (event) => {
    setDate(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div>
      <Banner />
      <div>
        <h2>Hamper Request</h2>

        <p>Select your preferred pickup date for your pickup: </p>
        <input type="date" value={date} onChange={handleDateChange}></input>

        <p>
          Please keep in mind that being more than 15 minutes late will require you
          to reschedule your pickup. <br /> If you do not reschedule, your hamper will be unpacked,
          and you will be required to wait 30 days until your next request.
        </p>

        <p>Please select which items you would like.</p>

        <p>
          The following items are running low or missing, so be aware they might not be
          included in your hamper: </p>
          
        <p label="low/missing"></p>
      </div>
    </div>
  );
};

export default UserDashboard;
