import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookReservation from "./pages/BookReservation";
import MyReservations from "./pages/MyReservations";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Navbar />

      <main style={{ minHeight: "90vh" }}>
        <Routes>
          {/* Customer Pages */}
          <Route path="/" element={<Home />} />

          <Route
            path="/book"
            element={<BookReservation />}
          />

          <Route
            path="/my-reservations"
            element={<MyReservations />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div
                style={{
                  textAlign: "center",
                  marginTop: "100px",
                }}
              >
                <h1>404</h1>
                <h3>Page Not Found</h3>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;