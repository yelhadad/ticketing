import express, { Request, Response} from 'express';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.get('/api/users/currentUser', (req: Request, res: Response) => {
  // checks if req.sesions exists and checks if req.session.jwt exists
  if(!req.session?.jwt){
    return res.send({ currentUser: null})
  }

  // decode the jwt and ensures its valid
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (error) {
    res.send({ currentUser: null});
  }
})

export { router as currentUserRouter};