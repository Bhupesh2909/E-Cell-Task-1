import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [internRes, appRes] = await Promise.all([
          axios.get("http://localhost:9000/startups", { headers }),
          axios.get("http://localhost:9000/applications", { headers }),
        ]);

        setInternships(internRes.data);
        setApplications(appRes.data);
      } catch (err) {
        console.error("Admin dashboard fetch failed:", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="upload-btn" onClick={() => navigate("/admin/upload")}>
          Upload Internship
        </button>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}>Logout</button>
      </div>

     

      <section>
        <h3>Internships</h3>
        {internships.length === 0 ? <p>No internships posted.</p> :
          <ul>
            {internships.map(i => (
              <li key={i._id}>
                <strong>{i.name}</strong><br />
                {i.description} <br />
                {i.role}<br />
                {i.domain}
              </li>
            ))}
          </ul>
        }
      </section>

      <section>
        <h3>Applications</h3>
        {applications.length === 0 ? <p>No applications filed.</p> :
          <ul>
            {applications.map(a => (
              <li key={a._id}>
                <strong>{a.studentId?.name}</strong><br />
                {a.studentId?.email}<br />
                <strong>{a.internshipId?.role}</strong>-<strong>{a.internshipId?.name}</strong><br />
                {a.internshipId?.domain}<br />
              </li>
            ))}
          </ul>
        }
      </section>
    </div>
  );
};

export default AdminDashboard;
