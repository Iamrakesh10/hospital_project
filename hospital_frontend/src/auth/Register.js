import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "",
    phone: "",
    email: "",
    age: "",
    sex: "",
    address: "",
    username: "",
    password: "",
    // Doctor-specific fields
    specialization: "",
    experience: "",
    qualification: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ""
      });
    }
  };

  // Format error messages from Django REST Framework
  const formatErrorMessage = (errorData) => {
    if (typeof errorData === 'string') {
      return errorData;
    }
    
    if (typeof errorData === 'object') {
      const errors = [];
      for (const [field, messages] of Object.entries(errorData)) {
        if (Array.isArray(messages)) {
          errors.push(`${field}: ${messages.join(', ')}`);
        } else {
          errors.push(`${field}: ${messages}`);
        }
      }
      return errors.join(' | ');
    }
    
    return "Registration failed";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setFieldErrors({});

    // Basic validation
    if (!formData.role) {
      setError("Please select a role");
      setLoading(false);
      return;
    }

    // Doctor-specific validation
    if (formData.role === "DOCTOR" && !formData.specialization) {
      setError("Specialization is required for doctors");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/register/",
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("Registration response:", response);
      
      // Check for success (201 Created or 200 OK)
      if (response.status === 201 || response.status === 200) {
        setSuccess("Registration successful! Redirecting to login...");
        
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(`Unexpected response: ${response.status}`);
      }
      
    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error response:", err.response);
      
      if (err.response) {
        // Server responded with error
        const errorData = err.response.data;
        
        if (err.response.status === 400) {
          // Bad Request - validation errors
          const formattedError = formatErrorMessage(errorData);
          setError(formattedError);
          
          // Set field-specific errors
          if (typeof errorData === 'object') {
            const newFieldErrors = {};
            for (const [field, messages] of Object.entries(errorData)) {
              if (Array.isArray(messages)) {
                newFieldErrors[field] = messages.join(', ');
              } else {
                newFieldErrors[field] = messages;
              }
            }
            setFieldErrors(newFieldErrors);
          }
        } else if (err.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(`Error: ${err.response.status} - ${err.response.statusText}`);
        }
      } else if (err.request) {
        // Request was made but no response
        setError("Network error. Please check your connection.");
      } else {
        // Something else happened
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Render field with error if any
  const renderField = (label, name, type = "text", placeholder = "", isTextarea = false) => (
    <div className="form-group">
      <label>{label}</label>
      {isTextarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className={fieldErrors[name] ? "error-field" : ""}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className={fieldErrors[name] ? "error-field" : ""}
        />
      )}
      {fieldErrors[name] && (
        <span className="field-error">{fieldErrors[name]}</span>
      )}
    </div>
  );

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Registration</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Role *</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              className={fieldErrors.role ? "error-field" : ""}
              required
            >
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="DOCTOR">Doctor</option>
              <option value="PATIENT">Patient</option>
            </select>
            {fieldErrors.role && (
              <span className="field-error">{fieldErrors.role}</span>
            )}
          </div>

          {renderField("Phone *", "phone", "tel", "Enter phone number")}
          {renderField("Email *", "email", "email", "Enter email address")}
          {renderField("Age *", "age", "number", "Enter age")}
          
          <div className="form-group">
            <label>Sex *</label>
            <select 
              name="sex" 
              value={formData.sex} 
              onChange={handleChange}
              className={fieldErrors.sex ? "error-field" : ""}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {fieldErrors.sex && (
              <span className="field-error">{fieldErrors.sex}</span>
            )}
          </div>

          {renderField("Address *", "address", "text", "Enter address", true)}
          {renderField("Username *", "username", "text", "Create username")}
          {renderField("Password *", "password", "password", "Create password")}

          {/* Doctor-specific fields - only show if role is DOCTOR */}
          {formData.role === "DOCTOR" && (
            <>
              <div className="doctor-fields">
                <h3>Doctor Information</h3>
                {renderField("Specialization *", "specialization", "text", "e.g., Cardiology, Neurology")}
              </div>
            </>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={loading ? "loading-btn" : ""}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && (
            <div className="error-message">
              <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="success-message">
              <p style={{ color: "green", fontWeight: "bold" }}>{success}</p>
            </div>
          )}

          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={{ color: "blue", cursor: "pointer" }}>
              Login here
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}