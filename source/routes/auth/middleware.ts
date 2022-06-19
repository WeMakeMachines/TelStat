import { body } from "express-validator";

export const validateUserLoginDetails = () => [
  body("userName").isString(),
  body("password").isString(),
];
