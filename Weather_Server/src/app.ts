import express from "express";
import { createServer } from "http";

import controller from "./controller";

const app = express();

app.use(controller);

const Server = createServer(app);
Server.listen(process.env.PORT || 5000);
