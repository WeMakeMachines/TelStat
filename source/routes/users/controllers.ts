import debug from "debug";
import bcrypt from "bcrypt";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";

import { TypedResponse, JsonResponse } from "../../types";
import config from "../../config";
import Jwt from "../../helpers/jsonwebtoken";
import { RequestWithUser } from "../../types";
import { UserType } from "../../types/schemas/User";
import UsersDAO from "./DAO";
import UsersDTO from "./DTO";

const log: debug.IDebugger = debug(config.namespace + ":controllers:user");

export async function createUser(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { userName, firstName, lastName, password } = req.body;

    const userNameTaken = await UsersDAO.getUserByUsername(userName);

    if (userNameTaken) throw new Error("Username already taken");

    await UsersDTO.createUser({
      userName,
      firstName,
      lastName,
      password,
    });

    res.status(StatusCodes.OK).json({ success: true, message: "User created" });
  } catch (error) {
    log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function loginUser(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { userName, password } = req.body;

    const user = await UsersDAO.getUserByUsername(userName);
    if (!user) throw new Error("User does not exist");

    const checkPassword = await bcrypt.compare(password, user.hash);
    if (!checkPassword) throw new Error("Passwords do not match");

    const token = await Jwt.sign(user);

    res
      .status(StatusCodes.OK)
      .cookie(config.jwtCookieName, token, {
        httpOnly: true,
        secure: true,
      })
      .json({ success: true });
  } catch (error) {
    log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function logoutUser(
  req: RequestWithUser,
  res: TypedResponse<JsonResponse>
) {
  res
    .clearCookie(config.jwtCookieName, {
      httpOnly: true,
      secure: true,
    })
    .json({ success: true });
}

export async function getUser(
  req: RequestWithUser,
  res: TypedResponse<JsonResponse>
) {
  try {
    // TODO Remove casting here
    const user = <UserType>req.user;

    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function updateUser(
  req: RequestWithUser,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { userName: newUserName, firstName, lastName, password } = req.body;

    // TODO Remove casting here
    const user = <UserType>req.user;

    await UsersDTO.updateUser({
      userName: user.userName,
      newUserName,
      firstName,
      lastName,
      password,
    });

    res.status(StatusCodes.OK).json({ success: true, message: "User updated" });
  } catch (error) {
    log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}
