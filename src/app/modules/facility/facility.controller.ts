import { Request, Response } from "express";
import { facilityService } from "./facility.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createFacility = catchAsync(async (req: Request, res: Response) => {
  const facility = req.body;

  const result = await facilityService.createFacilityIntoDb(facility);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility Created Successfully",
    data: result,
  });
});

const getAllFacility = catchAsync(async (req: Request, res: Response) => {
  const result = await facilityService.getAllFacilityFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility Retrieved Successfully",
    data: result,
  });
});

//get single facility by id
const getSingleFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await facilityService.getSingleFacilityFromDbB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Facility Retrieved Successfully",
    data: result,
  });
});

const updateFacility = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const { id } = req.params;

  const result = await facilityService.updateFacilityIntoDB(id, data);
  if (!result) {
    return res.status(404).json({ message: "facility not updated" });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Facility Updated Successfully",
    data: result,
  });
});
const deleteFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await facilityService.deleteFacilityFromDB(id);
  if (!result) {
    return res.status(404).json({ message: "facility not deleted" });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Facility Deleted Successfully",
    data: result,
  });
});

export const facilityController = {
  createFacility,
  getAllFacility,
  getSingleFacility,
  updateFacility,
  deleteFacility,
};
