import cors from "cors";
import express from "express";
import http from "http";
import debug from "debug";

import config from "./config";
import MongoDb from "./services/MongoDb";

const log: debug.IDebugger = debug(config.namespace);

const app: express.Application = express();
const server: http.Server = http.createServer(app);

MongoDb.connect({
  username: config.dbUser,
  password: config.dbPass,
  host: config.dbHost,
  dbName: config.dbName,
});

app.use(express.json());
app.use(cors());

server.listen(config.port, () => {
  log(`Server running at http://localhost:${config.port}`);
});
