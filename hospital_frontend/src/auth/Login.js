import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/accounts/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        // save token & role
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("role", res.data.role);

        // role-based redirect
        if (res.data.role === "doctor") {
          navigate("/doctor");
        } else if (res.data.role === "patient") {
          navigate("/patient");
        } else {
          navigate("/admin");
        }
      })
      .catch((err) => {
        alert("Invalid username or password");
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-title">Hospital Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
