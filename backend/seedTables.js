const mongoose = require("mongoose");
require("dotenv").config();

const Table = require("./models/Table");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const tables = [
  { tableNumber: 1, capacity: 2 },
  { tableNumber: 2, capacity: 2 },
  { tableNumber: 3, capacity: 4 },
  { tableNumber: 4, capacity: 4 },
  { tableNumber: 5, capacity: 4 },
  { tableNumber: 6, capacity: 6 },
  { tableNumber: 7, capacity: 6 },
  { tableNumber: 8, capacity: 8 },
  { tableNumber: 9, capacity: 8 },
  { tableNumber: 10, capacity: 10 }
];

async function seedTables() {
  try {

    // Remove existing tables
    await Table.deleteMany();

    // Insert new tables
    await Table.insertMany(tables);

    console.log("Tables Added Successfully ✅");

    process.exit();

  } catch (err) {

    console.log(err);

    process.exit(1);

  }
}

seedTables();