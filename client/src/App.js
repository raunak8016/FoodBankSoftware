import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import UserSignup from "./components/UserSignup";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user_signup" element={<UserSignup />} />
        <Route path="/user_dashboard/:email" element={<UserDashboard />} />
        <Route path="/admin_dashboard/:email" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};
export default App;
