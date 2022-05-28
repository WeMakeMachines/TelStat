import { body } from "express-validator";

export const validateUserLoginDetails = () => [
  body("userName").isString(),
  body("password").isString(),
];

export const validateUserCreateDetails = () => [
  body("userName").isString(),
  body("firstName").optional().isString(),
  body("lastName").optional().isString(),
  body("password").isString(),
];

export const validateUserUpdateDetails = () => [
  body("userName").optional().isString(),
  body("firstName").optional().isString(),
  body("lastName").optional().isString(),
  body("password").optional().isString(),
];

export const sanitiseUserDetails = () => {
  const charsNumbers = "0123456789";
  const charsAz = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

  return [
    body("userName").optional().trim().whitelist(`${charsAz}${charsNumbers}`),
    body("firstName").optional().trim().whitelist(charsAz),
    body("lastName").optional().trim().whitelist(charsAz),
    body("password").optional().trim(),
  ];
};
