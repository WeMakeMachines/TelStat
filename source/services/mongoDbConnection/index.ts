import mongoose from "mongoose";
import debug from "debug";

import Config from "../../Config";

const log: debug.IDebugger = debug(Config.namespace + ".mongodb");

class MongoDbConnection {
  private setupListeners() {
    mongoose.connection.on("error", (error) => this.handleError(error));
    mongoose.connection.on("disconnected", () => {
      log("Disconnected from MongoDB");
    });
  }

  private handleError(error: Error) {
    log("Error connecting to MongoDB: " + error.message);
  }

  public connect() {
    mongoose
      .connect(
        `mongodb+srv://${Config.db_user}:${Config.db_pass}@${Config.db_host}/${Config.db_name}?retryWrites=true&w=majority`
      )
      .then(() => {
        log("Connected to MongoDB");
        this.setupListeners();
      })
      .catch((error) => this.handleError(error));
  }
}

export default new MongoDbConnection();
