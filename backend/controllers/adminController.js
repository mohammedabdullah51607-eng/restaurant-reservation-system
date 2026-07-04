const User = require("../models/User");
const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

const getDashboard = async (req, res) => {
  try {
    // Dashboard Statistics
    const totalUsers = await User.countDocuments();

    const totalTables = await Table.countDocuments();

    const totalReservations = await Reservation.countDocuments();

    const bookedReservations = await Reservation.countDocuments({
      status: "Booked",
    });

    const cancelledReservations = await Reservation.countDocuments({
      status: "Cancelled",
    });

    // Latest Reservations
    const recentReservations = await Reservation.find()
      .populate("user", "name email")
      .populate("table", "tableNumber capacity")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      statistics: {
        totalUsers,
        totalTables,
        totalReservations,
        bookedReservations,
        cancelledReservations,
      },
      recentReservations,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};