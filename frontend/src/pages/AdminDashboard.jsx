import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/admin.css";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data.statistics);
      setReservations(res.data.recentReservations);
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Unable to connect to backend");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="admin-container">
        <h2>Dashboard Not Available</h2>
      </div>
    );
  }

  return (
    <div className="admin-container">

      <h1 className="admin-title">
        Admin Dashboard
      </h1>

      <div className="stats">

        <div className="card">
          <h3>Total Users</h3>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div className="card">
          <h3>Total Tables</h3>
          <h2>{stats.totalTables}</h2>
        </div>

        <div className="card">
          <h3>Total Reservations</h3>
          <h2>{stats.totalReservations}</h2>
        </div>

        <div className="card booked">
          <h3>Booked</h3>
          <h2>{stats.bookedReservations}</h2>
        </div>

        <div className="card cancelled">
          <h3>Cancelled</h3>
          <h2>{stats.cancelledReservations}</h2>
        </div>

      </div>

      <h2 className="recent-title">
        Recent Reservations
      </h2>

      <table className="reservation-table">

        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Table</th>
            <th>Guests</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {reservations.length === 0 ? (

            <tr>
              <td colSpan="7">No Reservations Found</td>
            </tr>

          ) : (

            reservations.map((reservation) => (

              <tr key={reservation._id}>

                <td>{reservation.user?.name || "-"}</td>

                <td>{reservation.user?.email || "-"}</td>

                <td>{reservation.table?.tableNumber || "-"}</td>

                <td>{reservation.guests}</td>

                <td>
                  {reservation.reservationDate
                    ? new Date(
                        reservation.reservationDate
                      ).toLocaleDateString("en-IN")
                    : "-"}
                </td>

                <td>{reservation.timeSlot || "-"}</td>

                <td>

                  <span
                    className={
                      reservation.status === "Booked"
                        ? "status bookedStatus"
                        : "status cancelledStatus"
                    }
                  >
                    {reservation.status}
                  </span>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;
