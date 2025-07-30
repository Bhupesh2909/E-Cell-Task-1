import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to SIP - Startup Internship Program</h1>
      <p>
        This platform connects NIT Trichy students with innovative startups for exciting internship opportunities.
        Startups can register and post internships, while students can apply and gain valuable experience.
      </p>

      <div className="home-buttons">
        <button onClick={() => navigate("/signup")} className="signup-btn">
          Signup
        </button>
        <button onClick={() => navigate("/login")} className="login-btn">
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
