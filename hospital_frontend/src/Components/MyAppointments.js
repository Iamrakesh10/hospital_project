import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("patient/appointments/my/")
      .then((res) => setAppointments(res.data));
  }, []);

  return (
    <div>
      <h2>My Appointments</h2>

      {appointments.map(a => (
        <div key={a.id}>
          <p>{a.doctor_name}</p>
          <p>{a.date} at {a.time}</p>
          <p>Status: {a.status}</p>
        </div>
      ))}
    </div>
  );
}
