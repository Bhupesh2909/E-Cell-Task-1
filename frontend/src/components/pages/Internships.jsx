import { useEffect, useState } from "react";
import axios from "axios";
import "./Internships.css";
import { useNavigate } from "react-router-dom";

const Internships = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get("http://localhost:9000/startups", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInternships(res.data);
      } catch (err) {
        setError("Failed to fetch internships.");
      }
    };

    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:9000/applications", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const applied = res.data.map(app => 
          typeof app.internshipId === "string" 
            ? app.internshipId : app.internshipId._id
        );
        setAppliedIds(applied);
      } catch (err) {
        console.error("Failed to fetch applications");
      }
    };

    fetchInternships();
    fetchApplications();
  }, [token]);

  const handleApply = async (internshipId) => {
    try {
      await axios.post("http://localhost:9000/applications/apply", { internshipId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppliedIds(prev => [...prev, internshipId]);
    } catch (err) {
      console.error("Apply failed:", err);
    }
  };

  return (
    <div className="internships-container">
      <button className="logout btn" onClick={() => {
        localStorage.removeItem("token"); 
        navigate("/")
        }}>Logout</button>
      <h2>Available Internships</h2>
      {error && <p className="error">{error}</p>}

      <div className="internship-list">
        {internships.map((intern) => (
          <div key={intern._id} className="intern-card">
            <h3>{intern.role}</h3>
            <p><strong>Company:</strong> {intern.name}</p>
            <p><strong>Domain:</strong> {intern.domain}</p>
            <p><strong>Founder:</strong> {intern.founder}</p>
            <p><strong>Email:</strong> {intern.email}</p>
            <p>{intern.description}</p>

            {appliedIds.includes(intern._id) ? (
              <button className="btn apply" disabled>
                Already Applied
              </button>
            ) : (
              <button className="btn apply" onClick={() => handleApply(intern._id)}>
                Apply
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Internships;
