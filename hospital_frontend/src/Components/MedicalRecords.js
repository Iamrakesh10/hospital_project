import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("patient/records/")
      .then((res) => setRecords(res.data));
  }, []);

  return (
    <div>
      <h2>Medical Records</h2>

      {records.map(r => (
        <div key={r.id}>
          <p><b>Doctor:</b> {r.doctor_name}</p>
          <p><b>Diagnosis:</b> {r.diagnosis}</p>
          <p><b>Prescription:</b> {r.prescription}</p>    
        </div>
      ))}
    </div>
  );
}
