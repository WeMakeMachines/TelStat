import express from "express";

import {
  validateUserLoginDetails,
  validateUserCreateDetails,
  validateUserUpdateDetails,
  sanitiseUserDetails,
  handleValidationErrors,
} from "./middleware";
import { authoriseUser } from "../../middleware/authorisation";
import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
  updateUser,
} from "./controllers";

const router = express.Router();

router.post(
  "/create",
  validateUserCreateDetails(),
  handleValidationErrors,
  sanitiseUserDetails(),
  createUser
);

router.post(
  "/login",
  validateUserLoginDetails(),
  handleValidationErrors,
  loginUser
);

router.get("/logout", logoutUser);

router.use(authoriseUser);

router.get("/", getUser);

router.patch(
  "/",
  validateUserUpdateDetails(),
  handleValidationErrors,
  sanitiseUserDetails(),
  updateUser
);

export default router;
