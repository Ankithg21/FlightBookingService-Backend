const {BookingService} = require("../services")
const {StatusCodes} = require("http-status-codes");
const {SuccessResponse, ErrorResponse} = require("../utils/common");

async function createBooking(req, res){
    try {
        const response =await BookingService.createBooking({
            flightId: req.body.flightId,
            userId: req.body.userId,
            noOfSeats: req.body.noOfSeats
        });
        SuccessResponse.message = "Successfully Flight Booking";
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = "Something went while creating Flight Booking.";
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function makePayment(){
    try {
        const response = await BookingService.makePayment({
            bookingId: req.body.bookingId,
            userId: req.body.userId,
            totalCost: req.body.totalCost
        });
        SuccessResponse.message = "Successfully done payment";
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = "Something went while Payment";
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

module.exports = {
    createBooking,
    makePayment
}