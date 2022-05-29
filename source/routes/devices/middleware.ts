import { NextFunction, Response } from "express";
import { body } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { RequestWithUser } from "../../types";
import { UserType } from "../../types/schemas/User";
import DevicesDAO from "./DAO";

export const validateDeviceCreateDetails = () => [body("label").isString()];

export const validateDeviceUpdateDetails = () => [
  body("label").optional().isString(),
];

export const sanitiseDeviceDetails = () => {
  const charsNumbers = "0123456789";
  const charsAz = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

  return [
    body("label").optional().trim().whitelist(`${charsAz}${charsNumbers}`),
  ];
};

export const validateDeviceOwner = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { deviceId } = req.params;

    // TODO Remove casting here
    const user = <UserType>req.user;
    const device = await DevicesDAO.getDeviceOwner(deviceId);

    if (!device) throw "Device not found";
    if (!user._id.equals(device.owner)) throw "Id mismatch";

    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({
      success: false,
      message: "Invalid device",
    });
  }
};
