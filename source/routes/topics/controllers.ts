import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { TypedResponse, JsonResponse } from "../../types";

import TopicsDAO from "./DAO";
import TopicsDTO from "./DTO";

export async function createTopic(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { name } = req.body;

    await TopicsDTO.create(name);

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Topic created" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function getTopic(req: Request, res: TypedResponse<JsonResponse>) {
  try {
    const { topicId } = req.params;
    const topic = await TopicsDAO.getById(topicId);

    res.status(StatusCodes.OK).json({
      success: true,
      data: topic,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function getAllTopics(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const topics = await TopicsDAO.getAll();

    res.status(StatusCodes.OK).json({
      success: true,
      data: topics,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function renameTopic(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { topicId } = req.params;
    const { name } = req.body;

    await TopicsDTO.rename({ topicId, name });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Topic renamed" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}

export async function deleteTopic(
  req: Request,
  res: TypedResponse<JsonResponse>
) {
  try {
    const { topicId } = req.params;

    await TopicsDTO.delete(topicId);

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Topic deleted" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "An error occurred" });
  }
}
