import express from "express";

import { handleValidationErrors } from "../../middleware/validation";
import {
  validateUserCreateDetails,
  validateUserUpdateDetails,
  sanitiseUserDetails,
} from "./middleware";
import { authoriseUser } from "../../middleware/authorisation";
import { createUser, getUser, updateUser } from "./controllers";

const router = express.Router();

router.post(
  "/",
  validateUserCreateDetails(),
  handleValidationErrors,
  sanitiseUserDetails(),
  createUser
);

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
