import express, { Request, Response} from 'express';
import { currentUser } from '../middlewere/current-user-middleware';
import { requireAuth } from '../middlewere/require-auth';

const router = express.Router();

router.get('/api/users/currentUser', currentUser, requireAuth, (req: Request, res: Response) => {
  res.send(req.currentUser || null);
})

export { router as currentUserRouter};