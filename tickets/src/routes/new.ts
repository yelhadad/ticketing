import express, { Request, Response} from 'express'
import { requireAuth, validateRequest } from '@ye-ticketing/common'
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-pulisher';
import { natsWrapper } from '../nats-wrapper';
import { ticketIndexRouter } from '.';

const router = express.Router();

router.post('/api/tickets', requireAuth,
 [
   body('title')
   .not()
   .isEmpty()
   .withMessage('name to tickets must be provided'),
   body('price').isFloat({gt: 0}).withMessage('price must be greater than zero')
   ],
   validateRequest,
//
  async (req: Request, res: Response ) => {

    const {title, price} : {title: string, price: number} = req.body
    const newTicket = Ticket.build({title, price, userId: req.currentUser!.id});
    await newTicket.save();
    console.log(await Ticket.find({_id: newTicket.id}))
    // there might be a situation were we saved a record to database and not publish event.
    // to solve this we may save the event to the data base and use transaction to make sure 
    // that the 2 records will save together.
    try {
      const ticketPub = new TicketCreatedPublisher(natsWrapper.client);
      await ticketPub.publish({
        id: newTicket._id,
        title: newTicket.title,
        price: newTicket.price,
        userId: newTicket.userId,
        version: newTicket.version
      })
      console.log('message published')
    } catch (error) {
      console.error(error)
    }

    res.status(201).send(newTicket);
})

export { router as createTicketRouter }   