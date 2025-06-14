const express = require("express");
const router = express.Router();
const {InfoController} = require("../../controllers/index.js");
const bookingRoutes = require("./booking-routes.js");

router.get("/info",InfoController.info);
router.use("/bookings", bookingRoutes)

module.exports = router;