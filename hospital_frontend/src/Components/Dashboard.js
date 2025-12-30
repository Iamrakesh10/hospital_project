import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";

export default function PatientHome() {
  const navigate = useNavigate();

  return (
    <div className="patient-container">
      <h1 className="patient-title">Patient Dashboard</h1>
      <p className="patient-subtitle">
        Manage appointments and doctors easily
      </p>

      <div className="card-container">
        <div className="card" onClick={() => navigate("/patient/doctors")}>
          <h3>View Doctors</h3>
          <p>Check available doctors</p>
        </div>

        <div className="card" onClick={() => navigate("/book-appointment")}>
          <h3>Book Appointment</h3>
          <p>Schedule your visit</p>
        </div>

        <div className="card" onClick={() => navigate("/my-appointments")}>
          <h3>My Appointments</h3>
          <p>See appointment history</p>
        </div>

        <div className="card" onClick={() => navigate("/patient/records")}>
          <h3>Medical Records</h3>
          <p>View your medical history</p>
        </div>

        

        <div
          className="card logout"
          onClick={() => navigate("/login", { replace: true })}
        >
          <h3>Logout</h3>
          <p>Sign out safely</p>
        </div>
      </div>
    </div>
  );
}
