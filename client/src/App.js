import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import UserSignup from "./components/UserSignup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user_signup" element={<UserSignup />} />
      </Routes>
    </Router>
  );
};
export default App;
