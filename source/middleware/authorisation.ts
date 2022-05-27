import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import Jwt from "../helpers/jsonwebtoken";
import UsersDAO from "../routes/users/DAO";
import config from "../config/config";
import { RequestWithUser } from "../types";

export async function authoriseUser(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies[config.jwtCookieName];
    const payload = await Jwt.verify(token);
    const user = await UsersDAO.getUserById(payload.sub);

    if (!user) throw "User not found";

    req.user = user;

    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).send({
      success: false,
      message: "Unauthorised request",
    });
  }
}
