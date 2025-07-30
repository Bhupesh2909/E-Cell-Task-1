import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import Login from "./components/pages/Login.jsx";
import Signup from "./components/pages/Signup.jsx";
import Internships from "./components/pages/Internships.jsx";
import AdminDashboard from "./components/pages/AdminDashboard.jsx";
import AdminUpload from "./components/pages/AdminUpload.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/upload" element={<AdminUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
