const Table = require("../models/Table");

// Create Table
const createTable = async (req, res) => {
    try {
        const table = await Table.create(req.body);

        res.status(201).json({
            message: "Table Created",
            table
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Tables
const getTables = async (req, res) => {
    try {
        const tables = await Table.find();

        res.json(tables);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createTable,
    getTables
};