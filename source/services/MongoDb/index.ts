import mongoose from "mongoose";

import mongoDbEvents from "./mongoDbEvents";

class MongoDbError extends Error {}

interface MongoDbConnectionOptions {
  username: string;
  password: string;
  host: string;
  dbName: string;
}

export default class MongoDb {
  public static connect({
    username,
    password,
    host,
    dbName,
  }: MongoDbConnectionOptions) {
    mongoDbEvents();

    mongoose
      .connect(
        `mongodb+srv://${username}:${password}@${host}/${dbName}?retryWrites=true&w=majority`
      )
      .catch((error) => {
        throw new MongoDbError(`Critical error, ${error.message}`);
      });
  }
}
