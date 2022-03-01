import console from "console";
import express, {Request, Response} from "express";
import { body, validationResult } from "express-validator"

const router = express.Router();

router.post('/api/users/signup',[
  body('email')
  .isEmail()
  .withMessage('email is not valid'),
  body('password')
  .trim()
  .isLength({min: 4, max: 20})
  .withMessage('password should be between 4 to 20 characters')
],
 (req: Request, res: Response) =>{
   const errors = validationResult(req)
   if(!errors.isEmpty()){
     throw errors.array();
   }
  const { email, password } = req.body;
  console.log('creting user...')
  return res.status(201).send({})
})

export { router as signupRouter };

