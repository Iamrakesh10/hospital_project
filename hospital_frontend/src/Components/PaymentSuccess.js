import { useEffect } from "react";

export default function PaymentSuccess() {

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem("pendingAppointment"));
    if (!pending) return;

    fetch("http://127.0.0.1:8000/api/patient/appointments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        doctor: Number(pending.doctor), 
        date: pending.date,
        time: pending.time,
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

  }, []);

  return <h2>✅ Payment successful</h2>;
}
