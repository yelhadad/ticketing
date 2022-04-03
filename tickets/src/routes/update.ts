import express , { Request, Response } from 'express';
import { currentUser, notAutherizedError, requireAuth, ServerError } from '@ye-ticketing/common';
import { Ticket } from '../models/ticket';
import { body } from 'express-validator'

const router = express.Router();

router.put('/api/tickets/:id', requireAuth,
body('title')
  .not()
  .isEmpty()
  .withMessage('title must be provided'),
body('price')
  .isNumeric()
  .withMessage('price must be numeric'),
  
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
  let updatedTicket
  try {
    updatedTicket = await Ticket.updateOne({_id: ticketId}, {title: title, price: price});
  } catch (error) {
    throw new ServerError('unable to update this ticket');
  }

  res.status(202).send(updatedTicket);

})

export { router as ticketUpdateRouter}