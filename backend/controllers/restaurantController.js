const Restaurant = require("../models/Restaurant");

// Create Restaurant
const createRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);

        res.status(201).json({
            message: "Restaurant Created",
            restaurant
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Restaurants
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();

        res.json(restaurants);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Single Restaurant
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant Not Found"
            });
        }

        res.json(restaurant);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Restaurant
const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant Not Found"
            });
        }

        res.json({
            message: "Restaurant Updated",
            restaurant
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Restaurant
const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant Not Found"
            });
        }

        res.json({
            message: "Restaurant Deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
};