import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-subtitle">System control and management</p>

      <div className="admin-cards">
        <div className="admin-card" onClick={() => navigate("/admin/doctors")}>
          <h3>Doctors</h3>
          <p>Manage doctors</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/patients")}>
          <h3>Patients</h3>
          <p>Manage patient records</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/facilities")}>
          <h3>Facilities</h3>
          <p>Manage departments</p>
        </div>

        <div className="admin-card" onClick={() => navigate("/admin/appointments")}>
          <h3>Appointments</h3>
          <p>View all appointments</p>
        </div>

        <div
          className="admin-card logout"
          onClick={() => {
            localStorage.clear();
            navigate("");
          }}
        >
          <h3>Logout</h3>
          <p>Exit admin panel</p>
        </div>
      </div>
    </div>
  );
}
