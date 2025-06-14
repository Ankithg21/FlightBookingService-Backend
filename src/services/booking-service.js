const axios = require("axios");
const {BookingRepository} = require("../repository");
const db = require("../models");
const { FLIGHT_SERVICE } = require("../config/server-config");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

async function createBooking(data){
    try {
        const result = db.sequelize.transaction(async function bookingImpl(t){
            const flight =await axios.get(`${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
            
            const flightData = flight.data.data;
            if(data.noOfseats > flightData.noOfseats){
                throw {message: "No. of seats exceed available seats."};
            }
            return true;
        });
    } catch (error) {
        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
};


module.exports = {
    createBooking,
};