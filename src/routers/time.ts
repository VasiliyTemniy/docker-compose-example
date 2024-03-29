import { Router, type RequestHandler } from "express";
import { getTime } from "../getTime.js";

const timeRouter = Router();

timeRouter.get("/", (async (req, res) => {
    res.send(await getTime());
  }) as RequestHandler
);

export default timeRouter;