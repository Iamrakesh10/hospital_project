import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("accounts/admin/appointments/")
      .then(res => {
        setAppointments(res.data);
        console.log("ADMIN APPOINTMENTS RESPONSE:", res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const updateStatus = (id, status) => {
    api.patch(`accounts/admin/appointments/${id}/status/`, { status })
      .then(() => {
        setAppointments(prev =>
          prev.map(a =>
            a.id === id ? { ...a, status } : a
          )
        );
      });
  };

  return (
    <div>
      <h2>Appointment Management</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{a.patient}</td>
              <td>{a.doctor}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td>{a.status}</td>
              <td>
                <button onClick={() => updateStatus(a.id, "APPROVED")}>Approve</button>
                <button onClick={() => updateStatus(a.id, "CANCELLED")}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
