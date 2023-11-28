// import React, { useState, useEffect } from "react";

// function App() {
//   const [data, setData] = useState([{}]);
//   const [UsersNames, setUsersNames] = useState([{}]);

//   useEffect(() => {
//     fetch("/members")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         console.log(data);
//       });
//   }, []);

//   useEffect(() => {
//     fetch("/User_fname")
//       .then((res) => res.json())
//       .then((data) => {
//         setUsersNames(data);
//         console.log(data);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Member List</h1>
//       <ul>
//         {typeof data.members === "undefined" ? (
//           <p>loading...</p>
//         ) : (
//           data.members.map((member, index) => <li key={index}>{member}</li>)
//         )}
//       </ul>

//       {/*------------------------ */}
//       <ul>
//         {typeof UsersNames.User_fname === "undefined" ? (
//           <p>loading...</p>
//         ) : (
//           UsersNames.User_fname.map((fname, index) => (
//             <li key={index}>{fname[0]}</li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';

const App = () => {
  return (
    <Router>
      
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
