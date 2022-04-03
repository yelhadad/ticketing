import express, { Request, Response} from 'express'
import { requireAuth, validateRequest } from '@ye-ticketing/common'
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

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
  async (req: Request, res: Response ) => {
    const {title, price} : {title: string, price: number} = req.body
    const newTicket = Ticket.build({title, price, userId: req.currentUser!.id});
    await newTicket.save()
    res.status(201).send(newTicket);
})

export { router as createTicketRouter }   