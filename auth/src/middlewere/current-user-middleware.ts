import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string,
  email: string
}

// alowing to interface typed property.
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
    
    //checks if req.session exists and req.session.jwt exists.
    if(!req.session?.jwt){
      return next(); // calling the next middleware
    }

    try {
      const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
      req.currentUser = payload
    } catch (error) {}
    next();
  }