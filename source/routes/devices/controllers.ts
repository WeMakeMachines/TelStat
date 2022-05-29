import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { TypedResponse, JsonResponse } from "../../types";

import { RequestWithUser } from "../../types";
import { DeviceType } from "../../types/schemas/Device";
import { UserType } from "../../types/schemas/User";
import DevicesDAO from "./DAO";
import DevicesDTO from "./DTO";

export async function createDevice(
  req: RequestWithUser,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { label } = req.body;

    // TODO Remove casting here
    const user = <UserType>req.user;

    await DevicesDTO.create({
      userId: user._id,
      label,
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Device created" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function getDevice(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { deviceId } = req.params;

    // TODO Remove casting here
    const device = <DeviceType>await DevicesDAO.getById(deviceId);

    res.status(StatusCodes.OK).json({
      success: true,
      data: device,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function getAllDevices(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const devices = await DevicesDAO.getAll();

    res.status(StatusCodes.OK).json({
      success: true,
      data: devices,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function renameDevice(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { name } = req.body;
    const { deviceId } = req.params;

    await DevicesDTO.rename({
      deviceId,
      name,
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Device renamed" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function deleteDevice(
  req: RequestWithUser,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { deviceId } = req.params;

    await DevicesDTO.delete(deviceId);

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Device deleted" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}
