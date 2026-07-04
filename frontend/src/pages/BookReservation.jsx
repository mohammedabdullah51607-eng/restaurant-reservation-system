import { useEffect, useState } from "react";
import API from "../services/api";

function BookReservation() {
  const [tables, setTables] = useState([]);

  const [formData, setFormData] = useState({
    table: "",
    reservationDate: "",
    timeSlot: "",
    guests: 1,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await API.get("/tables");
      setTables(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Unable to load tables.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/reservations",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);

      setFormData({
        table: "",
        reservationDate: "",
        timeSlot: "",
        guests: 1,
      });

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Reservation Failed"
      );
    }
  };

  return (
    <div style={{ width: "500px", margin: "40px auto" }}>
      <h2>Book Table</h2>

      {message && (
        <p style={{ color: "#22C55E", fontWeight: "bold" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <label>Table</label>

        <select
          name="table"
          value={formData.table}
          onChange={handleChange}
          required
        >
          <option value="">Select Table</option>

          {tables.map((table) => (
            <option key={table._id} value={table._id}>
              Table {table.tableNumber} (Capacity {table.capacity})
            </option>
          ))}
        </select>

        <label>Date</label>

        <input
          type="date"
          name="reservationDate"
          value={formData.reservationDate}
          onChange={handleChange}
          required
        />

        <label>Time</label>

        <input
          type="time"
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          required
        />

        <label>Guests</label>

        <input
          type="number"
          name="guests"
          min="1"
          value={formData.guests}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="primary-btn"
        >
          Reserve Table
        </button>

      </form>
    </div>
  );
}

export default BookReservation;