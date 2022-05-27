import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import config from "../../config";
import Jwt from "../../helpers/jsonwebtoken";
import { RequestWithUser } from "../../types";
import { UserType } from "../../types/schemas/User";
import UsersDAO from "./DAO";
import UsersDTO from "./DTO";

export async function createUser(req: Request, res: Response) {
  try {
    const { userName, firstName, lastName, password } = req.body;

    await UsersDTO.createUser({
      userName,
      firstName,
      lastName,
      password,
    });

    res.status(StatusCodes.OK).send("User created");
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "An error occurred" });
  }
}

export async function loginUser(req: Request, res: Response) {
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
      .send({ success: true });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Unsuccessful login attempt" });
  }
}

export async function logoutUser(req: RequestWithUser, res: Response) {
  res
    .clearCookie(config.jwtCookieName, {
      httpOnly: true,
      secure: true,
    })
    .send({ success: true });
}

export async function updateUser(req: RequestWithUser, res: Response) {
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

    res.status(StatusCodes.OK).send("User updated");
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "An error occurred" });
  }
}
