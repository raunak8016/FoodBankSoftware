import React, { useState } from "react";
import Banner from "./Banner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const App = () => {
  const [userType, setUserType] = useState("User");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const navigate = useNavigate();

  const handleToggle = () => {
    setUserType((prevType) => (prevType === "User" ? "Admin" : "User"));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", {
        email: email,
        userType: userType,
      });

      // Assuming the Flask server responds with some data
      const responseData = response.data.status;

      // for testing purposes only
      // const responseData = "true";

      console.log("Login response:", responseData);

      if (userType === "Admin" && responseData === "true") {
        // Navigate to the admin dashboard
        navigate(`/admin_dashboard/${email}`);
      } else if (userType === "User" && responseData === "true") {
        // Navigate to the user dashboard
        navigate(`/user_dashboard/${email}`);
      } else {
        setError("Error: Invalid email for user type!");
      }

      console.log("Login response:", responseData);
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error, show an error message, etc.
      setError("Error: An unexpected error occurred. Please try again.");
    }
  };

  
  const handleSignup = () => {
    try {
      navigate("/user_signup");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div>
      {showLogin === true && (
        <div>
          <Banner />
          <h1>Login/Signup Page</h1>
          <p></p>
          <div>
            <label>
              User Type:
              <button onClick={handleToggle}>{userType}</button>
            </label>
          </div>
          <p></p>
          <div>
            <label>
              Email:
              <input type="text" value={email} onChange={handleEmailChange} />
            </label>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <p></p>
          <div>
            <button onClick={handleLogin}>Login</button>
            {userType === "User" && (
              <button onClick={handleSignup}>Signup</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
