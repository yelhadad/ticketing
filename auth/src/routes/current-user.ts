import express, { Request, Response} from 'express';
import { currentUser } from '@ye-ticketing/common';
import { requireAuth } from '@ye-ticketing/common';

const router = express.Router();

router.get('/api/users/currentUser', currentUser, requireAuth, (req: Request, res: Response) => {
  res.send(req.currentUser || null);
})

export { router as currentUserRouter};