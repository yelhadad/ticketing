import express , { Request, Response } from 'express';
import {  notAutherizedError, requireAuth, ServerError, validateRequest, BadRequestError } from '@ye-ticketing/common';
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
  const ticket = await Ticket.findOne({_id: ticketId}).exec();
  if(ticket === null){
    throw new ServerError('ticket was not found in the database')
  }

  if(ticket.orderId){
    throw new BadRequestError('cannot edit reserved ticket');
  }
  
  if(ticket.userId !== req.currentUser!.id){
    throw new notAutherizedError(`current user don't have premitions on this ticket`)
  }
  const { title, price}  : { title: string, price: number} = req.body;
  ticket.title = title;
  ticket.price = price;
  
  try {
    await ticket.save()
    } catch (error) {
    throw new ServerError('unable to update this ticket');
  }


  try {
    const ticketPub =  new TicketUpdatedPublisher(natsWrapper.client)
    ticketPub.publish({
      id: ticket!._id,
      title: ticket!.title,
      price: ticket!.price,
      userId: ticket!.userId, 
      version: ticket!.version,
    }); 
  } catch (error) {
    console.error(error)
  }
  res.status(202).send(ticket);

})

export { router as ticketUpdateRouter}