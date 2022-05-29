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
  deleteDevice,
  getAllDevices,
  getDevice,
  renameDevice,
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

router.get("/:deviceId", getDevice);

router.use(validateDeviceOwner);

router.delete("/:deviceId", deleteDevice);

router.patch(
  "/:deviceId",
  validateDeviceUpdateDetails(),
  handleValidationErrors,
  sanitiseDeviceDetails(),
  renameDevice
);

export default router;
