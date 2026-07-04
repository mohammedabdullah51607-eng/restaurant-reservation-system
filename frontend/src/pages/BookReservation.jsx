import { useEffect, useState } from "react";
import Select from "react-select";
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

      const res = await API.post("/reservations", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message);

      setFormData({
        table: "",
        reservationDate: "",
        timeSlot: "",
        guests: 1,
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Reservation Failed");
    }
  };

  const tableOptions = tables.map((table) => ({
    value: table._id,
    label: `Table ${table.tableNumber} (Capacity ${table.capacity})`,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#2B3247",
      border: state.isFocused
        ? "2px solid #4F8CFF"
        : "1px solid #4F8CFF",
      borderRadius: "12px",
      minHeight: "50px",
      boxShadow: "none",
      color: "#fff",
    }),

    menu: (provided) => ({
      ...provided,
      background: "#2B3247",
      borderRadius: "12px",
      overflow: "hidden",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#2563EB"
        : state.isFocused
        ? "#3B82F6"
        : "#2B3247",
      color: "#fff",
      cursor: "pointer",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#CBD5E1",
    }),

    input: (provided) => ({
      ...provided,
      color: "#fff",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#fff",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "40px auto",
        background: "#252B3D",
        padding: "30px",
        borderRadius: "18px",
        color: "#fff",
        boxShadow: "0 15px 40px rgba(0,0,0,.3)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
        🍽 Book Table
      </h2>

      {message && (
        <p
          style={{
            color: "#22C55E",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <label>Table</label>

        <Select
          styles={customStyles}
          options={tableOptions}
          placeholder="Select Table"
          value={
            tableOptions.find((item) => item.value === formData.table) ||
            null
          }
          onChange={(selected) =>
            setFormData({
              ...formData,
              table: selected.value,
            })
          }
        />

        <label>Date</label>

        <input
          type="date"
          name="reservationDate"
          value={formData.reservationDate}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Time</label>

        <input
          type="time"
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Guests</label>

        <input
          type="number"
          name="guests"
          min="1"
          value={formData.guests}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            background: "linear-gradient(135deg,#2563EB,#4F8CFF)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "15px",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          🍽 Reserve Table
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  background: "#2B3247",
  border: "1px solid #4F8CFF",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "16px",
  boxSizing: "border-box",
};

export default BookReservation;