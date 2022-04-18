import mongoose from "mongoose";
import debug from "debug";

import Config from "../../Config";

const log: debug.IDebugger = debug(Config.namespace + ".mongodb");

export default function mongoDbConnection() {
  mongoose.connection.on("error", (error) => {
    log("Error connecting to MongoDB: " + error);
  });
  mongoose.connection.on("disconnected", () => {
    log("Disconnected from MongoDB");
  });

  mongoose
    .connect(
      `mongodb+srv://${Config.db_user}:${Config.db_pass}@${Config.db_host}/${Config.db_name}?retryWrites=true&w=majority`
    )
    .then(() => {
      log("Connected to MongoDB");
    });
}
