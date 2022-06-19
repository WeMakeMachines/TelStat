import express from "express";

import { handleValidationErrors } from "../../middleware/validation";
import { validateUserLoginDetails } from "./middleware";
import { loginUser, logoutUser } from "./controllers";

const router = express.Router();

router.post(
  "/login",
  validateUserLoginDetails(),
  handleValidationErrors,
  loginUser
);

router.get("/logout", logoutUser);

export default router;
