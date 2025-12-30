import { useNavigate } from "react-router-dom";
import "../Styles/Homepage.css";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">E-Hospitality Management System</h1>

      <p className="home-text">
        A digital platform for patients, doctors, and administrators
        to manage healthcare services efficiently.
      </p>

      <div className="home-buttons">
        <button className="home-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="home-btn" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Homepage;
