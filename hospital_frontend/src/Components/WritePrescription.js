import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function WritePrescription() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");

  const submitPrescription = async () => {
    await axios.post(
      `http://127.0.0.1:8000/api/doctor/prescribe/${patientId}/`,
      { diagnosis, prescription },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Prescription saved");
    navigate("/doctor");
  };

  return (
    <div>
      <h2>Write Prescription</h2>

      <textarea
        placeholder="Diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
      />

      <textarea
        placeholder="Prescription"
        value={prescription}
        onChange={(e) => setPrescription(e.target.value)}
      />

      <button onClick={submitPrescription}>Save</button>
    </div>
  );
}
