import express from "express";
import {
  validateUserLoginDetails,
  handleInvalidUserDetails,
  sanitiseUserDetails,
  validateUserCreateDetails,
} from "./middleware";
import { authoriseUser } from "../../middleware/authorisation";
import { createUser, loginUser, logoutUser, updateUser } from "./controllers";

const router = express.Router();

router.post(
  "/create",
  validateUserCreateDetails(),
  handleInvalidUserDetails,
  sanitiseUserDetails(),
  createUser
);

router.post(
  "/login",
  validateUserLoginDetails(),
  handleInvalidUserDetails,
  loginUser
);

router.get("/logout", logoutUser);

router.get("/", (req, res) => {
  res.send("ok");
});

router.patch(
  "/",
  sanitiseUserDetails(),
  handleInvalidUserDetails,
  authoriseUser,
  updateUser
);

export default router;
