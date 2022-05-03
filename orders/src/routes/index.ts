// this file fetchs all the orders tied to spesific user
import { Router, Request, Response } from "express";
import { BadRequestError, requireAuth } from "@ye-ticketing/common";
import { Order } from "../models/order";

const router = Router();

router.get('/api/orders',
requireAuth,
async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id
  }).populate('ticket') // adds ticket props to the orders
  
  res.send(orders);
})

export { router as indexOrdersRouter }