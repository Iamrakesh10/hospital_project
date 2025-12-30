import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/DoctorDashboard.css";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="doctor-container">
      <h1>Doctor Dashboard</h1>

      <div className="doctor-cards">
        <div onClick={() => navigate("/doctor/appointments")}>Appointments</div>
        <div onClick={()=> navigate("/doctor/mypatients")}>My Patients</div>
        
        <div className="logout" onClick={() => navigate("/login")}>Logout</div>
      </div>
    </div>
  );
}
