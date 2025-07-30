import { useState } from "react";
import axios from "axios";
import "./AdminUpload.css";
import { useNavigate } from "react-router-dom";

const AdminUpload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    founder: "",
    email: "",
    domain: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:9000/startups", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Internship uploaded successfully!");
      setFormData({
        name: "",
        description: "",
        founder: "",
        email: "",
        domain: "",
        role: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("Failed to upload internship.");
    }
  };

  return (
    <div className="upload-container">
      <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>Go Back</button>
      <h2>Upload Startup Internship</h2>
      
      <br />
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          name="name"
          placeholder="Startup Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="founder"
          placeholder="Founder Name"
          value={formData.founder}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Startup Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="domain"
          placeholder="Domain (e.g., AI, Web Dev)"
          value={formData.domain}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Internship Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Internship Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
        <button type="submit">Post Internship</button>
      </form>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default AdminUpload;
