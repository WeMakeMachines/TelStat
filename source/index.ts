import cors from "cors";
import express from "express";
import http from "http";
import debug from "debug";

import Config from "./Config";
import mongoDbConnection from "./services/mongoDbConnection/";

const debugLogger: debug.IDebugger = debug(Config.namespace);

const app: express.Application = express();
const server: http.Server = http.createServer(app);

mongoDbConnection();

app.use(express.json());
app.use(cors());

server.listen(Config.port, () => {
  debugLogger(`Server running at http://localhost:${Config.port}`);
});
