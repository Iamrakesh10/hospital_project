import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

 useEffect(() => {
  const pending = JSON.parse(localStorage.getItem("pendingAppointment"));
  if (!pending) return;

  fetch("http://127.0.0.1:8000/api/patient/appointment/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      doctor: Number(pending.doctor_id), // ✅ MUST be number
      date: pending.date,
      time: pending.time,
      status: "Paid",
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to save appointment");
      return res.json();
    })
    .then(() => {
      localStorage.removeItem("pendingAppointment");
      console.log("✅ Appointment saved in DB");
    })
    .catch((err) => console.error("❌", err));
}, [navigate]);



  return <h2>✅ Payment successful</h2>;
}
 