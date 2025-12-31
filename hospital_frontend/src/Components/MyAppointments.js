import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "../Styles/MyAppointments.css";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("patient/appointments/my/")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="my-container">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        My Appointments
      </h2>

      <table>
        <thead>
          <tr>
            
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td className={a.status}>
                {a.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
