// import React, { useState, useEffect } from "react";
// import api from "../api/axios";

// export default function BookAppointment() {
//   const [doctors, setDoctors] = useState([]);
//   const [form, setForm] = useState({
//     doctor: "",
//     date: "",
//     time: "",
//   });

//   useEffect(() => {
//   api.get("doctor/doctors/")
//     .then((res) => {
//       console.log("DOCTORS API RESPONSE:", res.data);
//       setDoctors(res.data);
//     })
//     .catch((err) => {
//       console.log("DOCTORS API ERROR:", err.response?.data || err.message);
//     });
// }, []);


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     api.post("patient/appointments/", form)
//       .then(() => alert("Appointment booked"))
//       .catch(() => alert("Failed"));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <select onChange={(e) => setForm({...form, doctor: e.target.value})}>
//         <option>Select Doctor</option>
//         {doctors.map(d => (
//           <option key={d.id} value={d.id}>{d.name}</option>
//         ))}
//       </select>

//       <input type="date" onChange={(e) => setForm({...form, date: e.target.value})} />
//       {/* <input type="time" onChange={(e) => setForm({...form, time: e.target.value})} /> */}
//       <input
//         type="time"
//         value={form.time}
//         onChange={(e) =>
//           setForm({ ...form, time: e.target.value })
//         }
//      required
//     />



//       <button>Book</button>
//     </form>
//   );
// }






import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "../Styles/BookAppointment.css";

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctor: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    api.get("doctor/doctors/")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.doctor || !form.date || !form.time) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await api.post(
        "payments/create-checkout-session/",
        form
      );

      localStorage.setItem(
        "pendingAppointment",
        JSON.stringify(form)
      );

      window.location.href = res.data.url;

    } catch (error) {
      console.error(error);
      alert("Payment initiation failed");
    }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-card">
        <h2>Book Appointment</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={form.doctor}
            onChange={(e) => setForm({ ...form, doctor: e.target.value })}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />

          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          />

          <button type="submit">Book & Pay</button>
        </form>
      </div>
    </div>
  );
}
