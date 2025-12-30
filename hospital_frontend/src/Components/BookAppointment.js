import React, { useState, useEffect } from "react";
import api from "../api/axios";

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctor: "",
    date: "",
    time: "",
  });

  useEffect(() => {
  api.get("doctor/doctors/")
    .then((res) => {
      console.log("DOCTORS API RESPONSE:", res.data);
      setDoctors(res.data);
    })
    .catch((err) => {
      console.log("DOCTORS API ERROR:", err.response?.data || err.message);
    });
}, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("patient/appointments/", form)
      .then(() => alert("Appointment booked"))
      .catch(() => alert("Failed"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={(e) => setForm({...form, doctor: e.target.value})}>
        <option>Select Doctor</option>
        {doctors.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <input type="date" onChange={(e) => setForm({...form, date: e.target.value})} />
      {/* <input type="time" onChange={(e) => setForm({...form, time: e.target.value})} /> */}
      <input
        type="time"
        value={form.time}
        onChange={(e) =>
          setForm({ ...form, time: e.target.value })
        }
     required
    />



      <button>Book</button>
    </form>
  );
}
