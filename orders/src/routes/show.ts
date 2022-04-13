import { Router, Request, Response } from "express";
import { BadRequestError, notAutherizedError, requireAuth } from "@ye-ticketing/common";
import { Order } from "../models/order";

const router = Router();

router.get('/api/orders/:orderId',
requireAuth,
async (req: Request, res: Response) => {
  const order = await Order.findOne(
  {id: req.params.orderId})
  .populate('ticket');

  if(!order){
    throw new BadRequestError('order does not exists')
  };
  console.log(req.currentUser!.id)
  console.log(order.userId)
  if(order.userId !== req.currentUser!.id){
    throw new notAutherizedError('you not have premitions to view this ticket')
  };
  
  res.status(200).send(order);
})

export { router as showOrderRouter };