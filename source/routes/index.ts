import express from "express";

import userRoute from "./users/";

const router = express.Router();

router.use("/user", userRoute);

export default router;
