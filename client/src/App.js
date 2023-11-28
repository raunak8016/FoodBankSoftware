import React, { useState, useEffect } from "react";

// import APIService from "./APIService";

function App() {
  const [data, setData] = useState([{}]);
  const [UserNames, setUserNames] = useState([{}]);

//   useEffect(() => {
//     fetch("/members")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         console.log(data);
//       });
//   }, []);

  useEffect(() => {
    fetch("/User_fname")
      .then((res) => res.json())
      .then((data) => {
        setUserNames(data);
        console.log(data);
      });
  }, []);

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
import AdminDashboard from './components/AdminDashboard';
import UserSignup from './components/UserSignup';

const App = () => {
  return (
    <Router>

      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/user_dashboard" element={<UserDashboard />} />
        <Route path="/user_signup" element={<UserSignup />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
    <div>
      <h1>Member List</h1>
      <ul>
        {typeof data.members === "undefined" ? (
          <p>loading...</p>
        ) : (
          data.members.map((member, index) => <li key={index}>{member}</li>)
        )}
      </ul>

      {/*------------------------ */}
      <ul>
        {typeof UserNames.User_fname === "undefined" ? (
          <p>loading...</p>
        ) : (
          UserNames.User_fname.map((fname, index) => (
            <li key={index}>{fname[0]}</li>
          ))
        )}
      </ul>
      <button>Login</button>
    </div>
  );
}

// function Form({ addedAdmin }) {
//   const [a_email, setA_email] = useState("JohnLee@gmail.com");
//   const [fname, setFname] = useState("John");
//   const [lname, setLname] = useState("Lee");

//   const AddNewAdmin = () => {
//     APIService.AddNewAdmin({ a_email, fname, lname })
//       .then((res) => addedAdmin(res))
//       .catch((error) => console.log(error));
//   };

//   function handleSubmit(e) {
//     e.preventDefault();
//     AddNewAdmin();
//     setA_email("");
//     setFname("");
//     setLname("");
//   }
// }

export default App;
