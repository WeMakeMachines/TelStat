import express from "express";

import authRoute from "./auth";
import publisherRoute from "./publisher";
import topicRoute from "./topic";
import userRoute from "./user";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/publisher", publisherRoute);
router.use("/topic", topicRoute);
router.use("/user", userRoute);

export default router;
