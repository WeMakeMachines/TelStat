import debug from "debug";
import mongoose from "mongoose";

import config from "../../config";

const log: debug.IDebugger = debug(config.namespace + ":mongodb");

export default function mongoDbEvents() {
  mongoose.connection.on("connecting", () => {
    log("Connecting to MongoDB...");
  });

  mongoose.connection.on("connected", () => {
    log("Connected to MongoDB");
  });

  mongoose.connection.on("reconnected", () => {
    log("Reconnected to MongoDB");
  });

  mongoose.connection.on("reconnectFailed", () => {
    log("Reached number of reconnect tries... unable to reconnect to MongoDB");
  });

  mongoose.connection.on("error", (exception: Error) => {
    log("Error connecting to MongoDB: " + exception.message);
  });

  mongoose.connection.on("disconnected", () => {
    log("Disconnected from MongoDB");
  });
}
