import express, { Request, Response } from 'express';
import { requireAuth, BadRequestError, notAutherizedError, OrderStatus } from '@ye-ticketing/common';
import { Order } from '../models/order';
import { natsWrapper } from '../nats-wrapper';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';

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

    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id
      }
    });
    
    res.status(202).send(order);
 })

 export { router as deleteOrderRouter }