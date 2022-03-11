import { Request, Response, NextFunction } from 'express';
import { notAutherizedError } from '../errors/not-autherized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(!req.currentUser){
    throw new notAutherizedError('not autherized to this path, you may not logged in or need to add premittions')
  }
  next();
}