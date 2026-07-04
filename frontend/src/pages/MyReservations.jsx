import { useEffect, useState } from "react";
import API from "../services/api";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/reservations/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservations(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to load reservations");
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/reservations/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Reservation Cancelled");

      fetchReservations();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to cancel reservation");
    }
  };

  if (loading) {
    return (
      <div className="reservation-page">
        <h2 className="page-title">Loading Reservations...</h2>
      </div>
    );
  }

  return (
    <div className="reservation-page">
      <h1 className="page-title">My Reservations</h1>

      {reservations.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          No Reservations Found
        </h2>
      ) : (
        <div className="reservation-grid">
          {reservations.map((reservation) => (
            <div
              className="reservation-card"
              key={reservation._id}
            >
              <h2>
                🍽 Table {reservation.table?.tableNumber || "-"}
              </h2>

              <p>
                <strong>Name:</strong>{" "}
                {reservation.customerName}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {reservation.phone}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {reservation.reservationDate
                  ? new Date(
                      reservation.reservationDate
                    ).toLocaleDateString("en-IN")
                  : "-"}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {reservation.timeSlot || "-"}
              </p>

              <p>
                <strong>Guests:</strong>{" "}
                {reservation.guests}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    reservation.status === "Booked"
                      ? "badge booked"
                      : "badge cancelled"
                  }
                >
                  {reservation.status}
                </span>
              </p>

              {reservation.status === "Booked" && (
                <button
                  className="cancel-btn"
                  onClick={() =>
                    cancelReservation(reservation._id)
                  }
                >
                  Cancel Reservation
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReservations;