import { Router, Request, Response } from "express";
import { requireAuth } from "@ye-ticketing/common";

const router = Router();

router.get('/api/orders',
requireAuth,
(req: Request, res: Response) => {
  res.send({});
})

export { router as indexOrdersRouter }