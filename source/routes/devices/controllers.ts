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
    const { label, topic } = req.body;

    // TODO Remove casting here
    const user = <UserType>req.user;

    await DevicesDTO.createDevice({
      userId: user._id,
      label,
      topic,
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Device created" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function getAllDevices(
  req: RequestWithUser,
  res: TypedResponse<JsonResponse>
) {
  try {
    // TODO Remove casting here
    const user = <UserType>req.user;
    const devices = await DevicesDAO.getDevicesByUserId(user._id);
    res.status(StatusCodes.OK).json({
      success: true,
      data: devices,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function getDevice(
  req: RequestWithUser,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { deviceId } = req.params;

    // TODO Remove casting here
    const device = <DeviceType>await DevicesDAO.getDeviceById(deviceId);

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

export async function updateDevice(
  req: RequestWithUser,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { deviceId, label, topic } = req.body;

    await DevicesDTO.updateDevice({
      deviceId,
      label,
      topic,
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Device updated" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}
