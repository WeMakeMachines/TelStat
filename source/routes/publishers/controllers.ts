import debug from "debug";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";

import { TypedResponse, JsonResponse } from "../../types";
import { RequestWithUser } from "../../types";
import { PublisherType } from "../../types/schemas/Publisher";
import { UserType } from "../../types/schemas/User";
import PublishersDAO from "./DAO";
import PublishersDTO from "./DTO";
import config from "../../config";

const log: debug.IDebugger = debug(
  config.namespace + ":controllers:publishers"
);

export async function createPublisher(
  req: RequestWithUser,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { name } = req.body;

    // TODO Remove casting here
    const user = <UserType>req.user;

    await PublishersDTO.create({
      userId: user._id,
      name,
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Publisher created" });
  } catch (error) {
    log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function getPublisher(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { publisherId } = req.params;

    // TODO Remove casting here
    const publisher = <PublisherType>await PublishersDAO.getById(publisherId);

    res.status(StatusCodes.OK).json({
      success: true,
      data: publisher,
    });
  } catch (error) {
    log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function getAllPublishers(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const publishers = await PublishersDAO.getAll();

    res.status(StatusCodes.OK).json({
      success: true,
      data: publishers,
    });
  } catch (error) {
    log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function renamePublisher(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { name } = req.body;
    const { publisherId } = req.params;

    await PublishersDTO.rename({
      publisherId,
      name,
    });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Publisher renamed" });
  } catch (error) {
    log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function deletePublisher(
  req: RequestWithUser,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { publisherId } = req.params;

    await PublishersDTO.delete(publisherId);

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Publisher deleted" });
  } catch (error) {
    log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}
