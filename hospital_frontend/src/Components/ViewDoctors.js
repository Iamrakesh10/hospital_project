import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("doctor/doctors/")
      .then((res) => {
        console.log("API Response:", res.data); // Add this line
        console.log("Response data type:", typeof res.data);
        console.log("Response data length:", Array.isArray(res.data) ? res.data.length : "Not an array");
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load doctors");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading doctors...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Available Doctors</h2>
      
      {doctors.length === 0 ? (
        <p>No doctors available. Please check if doctors are added in the admin panel.</p>
      ) : (
        doctors.map((doc) => (
          <div key={doc.id}>
            <p><b>{doc.name}</b></p>
            <p>Specialization: {doc.specialization}</p>
            
            <hr />
          </div>
        ))
      )}
    </div>
  );
}