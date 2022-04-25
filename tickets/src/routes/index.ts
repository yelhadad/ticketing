import express , { Request, Response } from 'express';
import { NotFoundError, requireAuth, ServerError } from '@ye-ticketing/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  let allTickets;
  try {
    allTickets = await Ticket.find({})
    // fix a bug when allTickets had duplicated documents
    for(let i=0; i < allTickets.length; i++ ){
      if(!allTickets[i].userId){
        allTickets.splice(i, 1);
        console.log('hi')
      }
    }
    console.log(allTickets)
  } catch (error) {
    console.error(error)
    throw new ServerError('unable to query all the tickets')
  };
  res.status(200).send(allTickets);
})

export { router as ticketIndexRouter}