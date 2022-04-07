import express , { Request, Response } from 'express';
import {  notAutherizedError, requireAuth, ServerError, validateRequest } from '@ye-ticketing/common';
import { Ticket } from '../models/ticket';
import { body } from 'express-validator'
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth,
body('title')
  .not()
  .isEmpty()
  .withMessage('title must be provided'),
body('price')
  .isFloat({gt: 0})
  .withMessage('price must be numeric'),
  validateRequest,
async (req: Request, res: Response) =>{
  const ticketId = req.params.id;
  const currentTicket = await Ticket.findOne({_id: ticketId}).exec();
  if(currentTicket === null){
    throw new ServerError('ticket was not found in the database')
  }
  if(currentTicket.userId !== req.currentUser!.id){
    throw new notAutherizedError(`current user don't have premitions on this ticket`)
  }
  const { title, price}  : { title: string, price: number} = req.body;
  try {
    await Ticket.updateOne({id: ticketId}, {title: title, price: price});
  } catch (error) {
    throw new ServerError('unable to update this ticket');
  }
  let updatedTicket;
  try {
    updatedTicket = await Ticket.findOne({id: ticketId})
  } catch (error) {
    throw new ServerError('unable to update this ticket');
  }
  try {
    const ticketPub =  new TicketUpdatedPublisher(natsWrapper.client)
    ticketPub.publish({
      id: updatedTicket!._id,
      title: updatedTicket!.title,
      price: updatedTicket!.price,
      userId: updatedTicket!.userId
    }) 
  } catch (error) {
    console.error(error)
  }
  res.status(202).send(updatedTicket);

})

export { router as ticketUpdateRouter}