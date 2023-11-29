import React, { useState } from "react";
import Banner from "./Banner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [userType, setUserType] = useState("User");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

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
      const responseData = response.data;

      console.log("Login response:", responseData);

      if (userType === "Admin" && responseData === "true") {
        // Navigate to the admin dashboard
        navigate("/admin_dashboard");
      } else if (userType === "User" && responseData === "true") {
        // Navigate to the user dashboard
        navigate("/user_dashboard");
      } else {
        // Display error message for invalid email and user type
        setError("Error: Invalid email for user type!");
      }

      // Reset error state on successful login
      setError(null);

      console.log("Login response:", responseData);
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error, show an error message, etc.
      setError("Error: An unexpected error occurred. Please try again.");
    }
  };

  const handleSignup = () => {
    try {
      // Assuming successful login logic here

      navigate("/user_signup");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div>
      <Banner />
      <h1>Login/Signup Page</h1>
      <div>
        <label>
          User Type:
          <button onClick={handleToggle}>{userType}</button>
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
        {userType === "User" && <button onClick={handleSignup}>Signup</button>}
      </div>
    </div>
  );
};

export default App;
