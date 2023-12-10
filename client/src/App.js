import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import UserSignup from "./components/UserSignup";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import ItemsinRequest from "./components/ItemsinRequest";
import ItemsinOrder from "./components/Admin/ItemsinOrder";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user_signup" element={<UserSignup />} />
        <Route path="/user_dashboard/:email" element={<UserDashboard />} />
        <Route path="/admin_dashboard/:email" element={<AdminDashboard />} />
        <Route path="/request-details/:requestId" element={<ItemsinRequest/>} />
        <Route path="/order-details/:orderNo" element={<ItemsinOrder/>} />
      </Routes>
    </Router>
  );
};
export default App;
