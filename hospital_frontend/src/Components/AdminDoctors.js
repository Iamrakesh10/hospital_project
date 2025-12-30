import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/accounts/admin/doctors/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setDoctors(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  const approveDoctor = (id) => {
    axios.patch(
      `http://127.0.0.1:8000/api/accounts/admin/approve-doctor/${id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(() => {
      setDoctors(prev =>
        prev.map(d =>
          d.id === id ? { ...d, is_approved: true } : d
        )
      );
    });
  };

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div>
      <h2>Doctor Management</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map(d => (
            <tr key={d.id}>
              <td>{d.username}</td>
              <td>{d.email}</td>
              <td>{d.is_approved ? "Approved" : "Pending"}</td>
              <td>
                {!d.is_approved && (
                  <button onClick={() => approveDoctor(d.id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
