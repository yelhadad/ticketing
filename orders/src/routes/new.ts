import { Router, Request, Response } from "express";
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, ServerError, validateRequest } from "@ye-ticketing/common";
import { body } from "express-validator";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { ticketIsReserved } from "../models/ticket";

const EXPERATION_WINDOW_SECONDS = 15 * 60   // 15 mins
export { EXPERATION_WINDOW_SECONDS } 
const router = Router();

router.post('/api/orders',
requireAuth,
[
  body('ticketId')
  .not()
  .isEmpty()
  .withMessage('ticket Id must be provided')
],
validateRequest,
async (req: Request, res: Response) => {
  // find the Ticket in the database
  const { ticketId } = req.body
  const ticket = await Ticket.findById(ticketId)
  if(!ticket) {
    throw new NotFoundError();
  }

  // make sure the ticket is not already reserved
  console.log(await ticketIsReserved(ticket))
  if(await ticketIsReserved(ticket)){
    throw new BadRequestError('The ticket is already reseved')
  }

  // calculate the exprition date for the order
  const experation = new Date();
  experation.setSeconds(experation.getSeconds() + EXPERATION_WINDOW_SECONDS)
  // create the order and save it to the database
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: experation,
    ticket,
  })
  await order.save();
  // publish event that a new order created

  await new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    expiresAt: order.expiresAt.toISOString(),
    status: order.status,
    userId: req.currentUser!.id,
    version: order.version,
    ticket: {
      price: order.ticket.price,
      title: order.ticket.title,
      id: order.ticket.id,
    }
  })

  
  res.status(201).send(order);
})

export { router as newOrderRouter };
