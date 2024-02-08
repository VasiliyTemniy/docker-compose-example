import { Router } from "express";
import { getTime } from "../getTime";

const timeRouter = Router();

timeRouter.get("/", (req, res) => {
  res.send(getTime());
});

export default timeRouter;