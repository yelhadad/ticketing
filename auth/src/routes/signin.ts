import express, {Request, Response} from 'express';
import { User } from '../models/user'
import { Password } from '../services/password';
import { body, } from "express-validator"
import { validateRequest } from '../middlewere/validation-handler';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post('/api/users/signin',[
  body('email')
  .isEmail()
  .withMessage('email is not valid') //,
  // password checking dosn't work
  //body('password')
  //.trim()
  //.isEmpty()
  //.withMessage('please enter a password')
], validateRequest,
 async (req: Request, res: Response) => {
  const {email, password}: {email: string, password: string} = req.body;
  // checks if email exists
  if(await User.findOne({email: email}).exec() === null){
    throw new BadRequestError("invalid email! this email dosn't exsits on our servers")
  }
  const userByEmail = await User.findOne({email: email}).exec();
  // function that exepts email and returns the password of this user by email:
  const storedPassword = (email: string) => {
    return userByEmail!.password
  }

  // check if passwords matched...
  if(!(await Password.compare(await storedPassword(email), password))){
    throw new BadRequestError('invalid password please insert the current password')
  }

    // Generate JWT
    const userJwt = jwt.sign({
      id: userByEmail!.id,
      email: userByEmail!.email
    }, process.env.JWT_KEY!)

      // Store it on session object
    req.session = {
      jwt: userJwt
    };

  // sends jwt to the user
  return res.status(202).send(userByEmail);
})

export { router as signinRouter};