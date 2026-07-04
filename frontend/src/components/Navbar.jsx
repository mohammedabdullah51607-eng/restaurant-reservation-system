import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        🍽 Paradise Biryani
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {token && (
          <>
            <li>
              <Link to="/book">Book Table</Link>
            </li>

            <li>
              <Link to="/my-reservations">My Reservations</Link>
            </li>

            {user?.role === "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}

            <li>
              <button
                className="logout-btn"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </>
        )}

        {!token && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;