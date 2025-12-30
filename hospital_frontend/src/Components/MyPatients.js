import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyPatients() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/doctor/mypatients/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setPatients(res.data));
  }, []);

  return (
    <div>
      <h2>My Patients</h2>

      <ul>
        {patients.map((p) => (
          <li key={p.id}>
            {p.username}
            <button onClick={() => navigate(`/doctor/prescribe/${p.id}`)}>
              Write Prescription
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
