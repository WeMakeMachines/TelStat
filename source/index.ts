import cors from "cors";
import express from "express";
import http from "http";
import debug from "debug";

import Config from "./Config";
import mongoDbConnection from "./services/mongoDbConnection/";

const log: debug.IDebugger = debug(Config.namespace);

const app: express.Application = express();
const server: http.Server = http.createServer(app);

mongoDbConnection.connect();

app.use(express.json());
app.use(cors());

server.listen(Config.port, () => {
  log(`Server running at http://localhost:${Config.port}`);
});
