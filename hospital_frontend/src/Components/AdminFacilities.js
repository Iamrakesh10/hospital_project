import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminFacilities() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    api.get("accounts/admin/departments/")
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  const addDepartment = () => {
    if (!name) return;

    api.post("accounts/admin/departments/", { name })
      .then(() => {
        setDepartments([...departments, { name }]);
        setName("");
      });
  };

  return (
    <div>
      <h2>Facilities / Departments</h2>

      <input
        type="text"
        placeholder="Department name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addDepartment}>Add</button>

      <ul>
        {departments.map((d, i) => (
          <li key={i}>{d.name}</li>
        ))}
      </ul>
    </div>
  );
}
