import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get("accounts/admin/patients/")
      .then(res => setPatients(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleStatus = (id) => {
    api.patch(`accounts/admin/patients/toggle/${id}/`)
      .then(res => {
        setPatients(prev =>
          prev.map(p =>
            p.id === id ? { ...p, is_active: res.data.is_active } : p
          )
        );
      });
  };

  return (
    <div>
      <h2>Patient Management</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.username}</td>
              <td>{p.email}</td>
              <td>{p.phone}</td>
              <td>{p.age}</td>
              <td>{p.is_active ? "Active" : "Blocked"}</td>
              <td>
                <button onClick={() => toggleStatus(p.id)}>
                  {p.is_active ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
