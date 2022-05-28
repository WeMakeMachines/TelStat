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

export async function createUser(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { userName, firstName, lastName, password } = req.body;

    await UsersDTO.createUser({
      userName,
      firstName,
      lastName,
      password,
    });

    res.status(StatusCodes.OK).json({ success: true, message: "User created" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function loginUser(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { userName, password } = req.body;

    const user = await UsersDAO.getUserByUsername(userName);
    if (!user) throw "User does not exist";

    const checkPassword = await bcrypt.compare(password, user.hash);
    if (!checkPassword) throw "Passwords do not match";

    const token = await Jwt.sign(user);

    res
      .status(StatusCodes.OK)
      .cookie(config.jwtCookieName, token, {
        httpOnly: true,
        secure: true,
      })
      .json({ success: true });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Unsuccessful login attempt" });
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}
