import express , { Request, Response } from 'express';
import { NotFoundError, requireAuth, ServerError } from '@ye-ticketing/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', requireAuth, async (req: Request, res: Response) => {
  let allTickets;
  try {
    allTickets = await Ticket.find({})
  } catch (error) {
    console.error(error)
    throw new ServerError('unable to query all the tickets')
  };
  res.status(200).send(allTickets);
})

export { router as ticketIndexRouter}