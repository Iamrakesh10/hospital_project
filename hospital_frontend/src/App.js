import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import PatientHome from "./Components/Dashboard";
import DoctorDashboard from "./Components/Doctor_dashboard";
import AdminDashboard from "./Components/Admin_dashboard";
import BookAppointment from "./Components/BookAppointment";
import MyAppointments from "./Components/MyAppointments";
import DoctorAppointments from "./Components/DoctorAppointments";
import ViewDoctors from "./Components/ViewDoctors";
import MedicalRecords from "./Components/MedicalRecords";
import AdminDoctors from "./Components/AdminDoctors";
import AdminFacilities from "./Components/AdminFacilities";
import PaymentSuccess from "./Components/PaymentSuccess";
import PaymentFailed from "./Components/PaymentFailed";
import MyPatients from "./Components/MyPatients";
import WritePrescription from "./Components/WritePrescription";
import AdminPatients from "./Components/AdminPatients";
import AdminAppointments from "./Components/AdminAppointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient" element={<PatientHome />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
    
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
         <Route path="/doctor/appointments" element={<DoctorAppointments />} />
         <Route path="/patient/doctors" element={<ViewDoctors />} />
        <Route path="/patient/records" element={<MedicalRecords />} />
         <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/doctors" element={<AdminDoctors />} />
          <Route path="/admin/facilities" element={<AdminFacilities />} />
          <Route path="/admin/appointments" element={<AdminAppointments />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/doctor/mypatients" element={<MyPatients />} />
        <Route path="/doctor/prescribe/:patientId" element={<WritePrescription />} />
        <Route path="/admin/patients" element={<AdminPatients />} />
       





      </Routes>
    </BrowserRouter>
  );
}

export default App;
