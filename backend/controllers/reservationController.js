const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

/*
==========================================
Customer - Create Reservation
==========================================
*/
const createReservation = async (req, res) => {
  try {
    const { table, reservationDate, timeSlot, guests } = req.body;

    if (!table || !reservationDate || !timeSlot || !guests) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const selectedTable = await Table.findById(table);

    if (!selectedTable) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    if (guests > selectedTable.capacity) {
      return res.status(400).json({
        message: `Maximum ${selectedTable.capacity} guests allowed for this table`,
      });
    }

    const existingReservation = await Reservation.findOne({
      table,
      reservationDate,
      timeSlot,
      status: "Booked",
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "Table already booked for this date & time",
      });
    }

    const reservation = await Reservation.create({
      user: req.user.id,
      table,
      reservationDate,
      timeSlot,
      guests,
      status: "Booked",
    });

    res.status(201).json({
      message: "Reservation Successful",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
==========================================
Customer - My Reservations
==========================================
*/
const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      user: req.user.id,
    })
      .populate("user", "name email phone")
      .populate("table", "tableNumber capacity");

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
==========================================
Customer - Cancel Reservation
==========================================
*/
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    reservation.status = "Cancelled";

    await reservation.save();

    res.json({
      message: "Reservation Cancelled Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
==========================================
Admin - View All Reservations
==========================================
*/
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "name email phone")
      .populate("table", "tableNumber capacity");

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
==========================================
Admin - View Reservations By Date
==========================================
*/
const getReservationsByDate = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      reservationDate: req.params.date,
    })
      .populate("user", "name email phone")
      .populate("table", "tableNumber capacity");

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
==========================================
Admin - Update Reservation
==========================================
*/
const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    res.json({
      message: "Reservation Updated Successfully",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
==========================================
Admin - Delete Reservation
==========================================
*/
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    res.json({
      message: "Reservation Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  cancelReservation,
  getAllReservations,
  getReservationsByDate,
  updateReservation,
  deleteReservation,
};