import express, { Request, Response} from 'express';
import { BadRequestError, NotFoundError, requireAuth } from '@ye-ticketing/common';
import { Ticket } from '../models/ticket'

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticketById = await Ticket.findById(req.params.id);
  if(!ticketById){
    throw new NotFoundError()
  }
  console.log(ticketById)
  res.status(200).send(ticketById);
})

export { router as showTicket}