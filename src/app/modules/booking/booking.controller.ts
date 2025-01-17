import { Request, Response } from "express";
import httpStatus from "http-status";
import {
  BookingService,
  findAvailableSlotFromDb,
  getBookingsByDate,
} from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = req.body;
  console.log(booking);
  const result = await BookingService.createBookingIntoDB(booking);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Created Successfully",
    data: result,
  });
});

// get all bookings
const getBookingByUser = async (req: Request, res: Response) => {
  const userId: any = req.query;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }
  const result = await BookingService.getBookingByUser(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking By User Retrieved Successfully",
    data: result,
  });
};
const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookingFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Booking  Retrieved Successfully",
    data: result,
  });
});
const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.cancelBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Deleted Successfully",
    data: result,
  });
});

const checkAvailableSlot = catchAsync(async (req: Request, res: Response) => {
  const date = req.query.date || new Date().toISOString().split("T")[0];
  const bookings = await getBookingsByDate(date as string);
  const openingTime = "08:00";
  const closingTime = "18:00";
  const result = findAvailableSlotFromDb(bookings, openingTime, closingTime);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Availability checked successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBooking,
  getBookingByUser,
  cancelBooking,
  checkAvailableSlot,
};
