import express from "express";

import publisherRoute from "./publishers";
import userRoute from "./users";

const router = express.Router();

router.use("/publisher", publisherRoute);
router.use("/user", userRoute);

export default router;
