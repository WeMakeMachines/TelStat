import express from "express";

import { handleValidationErrors } from "../../middleware/validation";
import {
  validateDeviceCreateDetails,
  validateDeviceUpdateDetails,
  sanitiseDeviceDetails,
  validateDeviceOwner,
} from "./middleware";
import { authoriseUser } from "../../middleware/authorisation";
import {
  createDevice,
  getAllDevices,
  getDevice,
  updateDevice,
} from "./controllers";

const router = express.Router();

router.use(authoriseUser);

router.post(
  "/create",
  validateDeviceCreateDetails(),
  handleValidationErrors,
  sanitiseDeviceDetails(),
  createDevice
);

router.get("/all", getAllDevices);

router.get("/:deviceId", validateDeviceOwner, getDevice);

router.patch(
  "/",
  validateDeviceOwner,
  validateDeviceUpdateDetails(),
  handleValidationErrors,
  sanitiseDeviceDetails(),
  updateDevice
);

export default router;
