import express from "express";

import { handleValidationErrors } from "../../middleware/validation";
import {
  validatePublisherName,
  validatePublisherOwner,
  sanitisePublisherName,
} from "./middleware";
import { authoriseUser } from "../../middleware/authorisation";
import {
  createPublisher,
  deletePublisher,
  getAllPublishers,
  getPublisher,
  renamePublisher,
} from "./controllers";

const router = express.Router();

router.use(authoriseUser);

router.post(
  "/create",
  validatePublisherName(),
  handleValidationErrors,
  sanitisePublisherName(),
  createPublisher
);

router.get("/all", getAllPublishers);

router.get("/:publisherId", getPublisher);

router.delete("/:publisherId", validatePublisherOwner, deletePublisher);

router.patch(
  "/:publisherId",
  validatePublisherOwner,
  validatePublisherName(),
  handleValidationErrors,
  sanitisePublisherName(),
  renamePublisher
);

export default router;
