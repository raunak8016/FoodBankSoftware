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
  );
};
export default App;