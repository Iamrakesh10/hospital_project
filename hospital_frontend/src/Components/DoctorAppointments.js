import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/DoctorAppointments.css";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/doctor/appointments/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.patch(
      `http://127.0.0.1:8000/api/doctor/appointments/${id}/status/`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    fetchAppointments(); // 🔥 refresh UI with fresh data
  };

  return (
    <div className="doctor-app-container">
      <h2>Appointments</h2>

      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.patient_name}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>{a.status}</td>
              <td>
                <button onClick={() => updateStatus(a.id, "APPROVED")}>
                  Approve
                </button>
                <button onClick={() => updateStatus(a.id, "REJECTED")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
