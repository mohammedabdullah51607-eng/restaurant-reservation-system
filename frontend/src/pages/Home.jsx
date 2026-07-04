import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaStar,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Home() {
  return (
    <div className="page">

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <h1 className="gradient">
            Paradise Biryani
          </h1>

          <p className="hero-subtitle">
            Experience the authentic taste of
            Hyderabadi Dum Biryani with a premium
            dining experience.
          </p>

          <div className="hero-buttons">

            <Link to="/book">
              <button className="heroBtn">
                🍽 Reserve Table
              </button>
            </Link>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1701579231373-42941901d956?q=80&w=1200&auto=format&fit=crop"
            alt="Paradise Biryani"
          />

        </div>

      </section>

      {/* Features */}

      <section className="container mt-5">

        <h2 className="text-center mb-5">
          Why Choose Paradise?
        </h2>

        <div className="grid-3">

          <div className="card text-center">

            <FaUtensils
              size={45}
              color="#F59E0B"
            />

            <h3 className="mt-2">
              Authentic Taste
            </h3>

            <p>
              Fresh ingredients and
              traditional Hyderabadi recipes.
            </p>

          </div>

          <div className="card text-center">

            <FaStar
              size={45}
              color="#3B82F6"
            />

            <h3 className="mt-2">
              Premium Service
            </h3>

            <p>
              Enjoy a luxury dining
              experience with family and friends.
            </p>

          </div>

          <div className="card text-center">

            <FaClock
              size={45}
              color="#22C55E"
            />

            <h3 className="mt-2">
              Instant Booking
            </h3>

            <p>
              Reserve your favourite table
              within seconds.
            </p>

          </div>

        </div>

      </section>

      {/* Featured Dishes */}

      <section className="container mt-5">

        <h2 className="text-center mb-5">
          Featured Dishes
        </h2>

        <div className="grid-3">

          <div className="card">

            <img
              src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=800&auto=format&fit=crop"
              alt="Chicken Biryani"
            />

            <h3 className="mt-2">
              Chicken Dum Biryani
            </h3>

            <p>
              Slow cooked with aromatic spices.
            </p>

          </div>

          <div className="card">

            <img
              src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop"
              alt="Mutton Biryani"
            />

            <h3 className="mt-2">
              Mutton Biryani
            </h3>

            <p>
              Tender mutton cooked to perfection.
            </p>

          </div>

          <div className="card">

            <img
              src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop"
              alt="Paneer Biryani"
            />

            <h3 className="mt-2">
              Paneer Biryani
            </h3>

            <p>
              A delicious vegetarian favourite.
            </p>

          </div>

        </div>

      </section>

      {/* Contact */}

      <section className="container mt-5">

        <div className="card text-center">

          <FaMapMarkerAlt
            size={40}
            color="#F59E0B"
          />

          <h2 className="mt-2">
            Visit Us
          </h2>

          <p>
            Paradise Biryani,
            Hyderabad, Telangana
          </p>

          <p>
            Open Daily • 11:00 AM - 11:00 PM
          </p>

        </div>

      </section>

    </div>
  );
}

export default Home;