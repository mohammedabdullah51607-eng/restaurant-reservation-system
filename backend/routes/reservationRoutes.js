const express = require("express");
const router = express.Router();

const {
  createReservation,
  getMyReservations,
  cancelReservation,
  getAllReservations,
  getReservationsByDate,
  updateReservation,
  deleteReservation,
} = require("../controllers/reservationController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

/*
=================================
Customer Routes
=================================
*/

// Create Reservation
router.post("/", protect, createReservation);

// View My Reservations
router.get("/my", protect, getMyReservations);

// Cancel My Reservation
router.put("/cancel/:id", protect, cancelReservation);

/*
=================================
Admin Routes
=================================
*/

// View All Reservations
router.get("/", protect, adminOnly, getAllReservations);

// View Reservations By Date
router.get("/date/:date", protect, adminOnly, getReservationsByDate);

// Update Reservation
router.put("/:id", protect, adminOnly, updateReservation);

// Delete Reservation
router.delete("/:id", protect, adminOnly, deleteReservation);

module.exports = router;