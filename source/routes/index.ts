import express from "express";

import deviceRoute from "./devices";
import userRoute from "./users";

const router = express.Router();

router.use("/device", deviceRoute);
router.use("/user", userRoute);

export default router;
