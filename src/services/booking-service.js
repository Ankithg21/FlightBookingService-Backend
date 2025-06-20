const axios = require("axios");
const {BookingRepository} = require("../repository");
const db = require("../models");
const { FLIGHT_SERVICE } = require("../config/server-config");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const Enums = require("../utils/common");
const {BOOKED} = Enums.BOOKING_STATUS;

const bookingRepository = new BookingRepository();

async function createBooking(data){
    const transaction = await db.sequelize.transation();
    try {
        const flight =await axios.get(`${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
        const flightData = flight.data.data;
        if(data.noOfseats > flightData.noOfseats){
            throw new AppError("Not enough Seats available.", StatusCodes.BAD_REQUEST);
        }

        const totalBillingAmount = data.noOfseats * flightData.price;
        const bookingPayload = {...data, totalCost: totalBillingAmount};
        const booking = await bookingRepository.createBooking(bookingPayload, transaction);

        const response = await axios.patch(`${FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`, {
            seats: data.noOfSeats
        });

        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

async function makePayment(data){
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(data.bookingId, transaction);
        if(bookingDetails.totalCosts !== data.totalCost){
            throw new AppError("The amount of the payment doesnt match", StatusCodes.BAD_REQUEST);
        }
        if(bookingDetails.userId !== data.userId){
            throw new AppError("The User corresponding to the booking doesnt match", StatusCodes.BAD_REQUEST);
        }
        const response = await bookingRepository.update(data.bookingId, {status: BOOKED}, transaction);
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


module.exports = {
    createBooking,
    makePayment,
};