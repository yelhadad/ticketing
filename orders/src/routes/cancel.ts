import express, { Request, Response } from 'express';
import { requireAuth, BadRequestError, notAutherizedError, OrderStatus } from '@ye-ticketing/common';
import { Order } from '../models/order';

const router = express.Router()

router.put('/api/orders/:orderId', 
requireAuth,
async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId).populate('ticket')
    if(!order){
      throw new BadRequestError('order does not exists')
    };
    if(order.userId !== req.currentUser!.id){
      throw new notAutherizedError('you not have premitions to view this ticket')
    };

    order.status = OrderStatus.Cancelled;
    await order.save();
    
    res.status(202).send(order);
 })

 export { router as deleteOrderRouter }