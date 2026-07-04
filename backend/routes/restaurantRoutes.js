const express = require("express");

const {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
} = require("../controllers/restaurantController");

const router = express.Router();

router.post("/", createRestaurant);

router.get("/", getRestaurants);

router.get("/:id", getRestaurantById);

router.put("/:id", updateRestaurant);

router.delete("/:id", deleteRestaurant);

module.exports = router;