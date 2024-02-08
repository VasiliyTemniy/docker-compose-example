import { Router } from "express";

const timeRouter = Router();

timeRouter.get("/", (req, res) => {
  res.send((new Date()).toISOString());
});

export default timeRouter;