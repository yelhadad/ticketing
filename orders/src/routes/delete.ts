import express, { Request, Response } from 'express';
import { requireAuth } from '@ye-ticketing/common';

const router = express.Router()

router.delete('/api/orders/:id', 
requireAuth,
 (req: Request, res: Response) => {
   res.send({});
 })