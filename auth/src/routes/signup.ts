import console from "console";
import express, {Request, Response} from "express";
import { body, validationResult } from "express-validator"
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();
const DbConnection = false;
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
    throw new RequestValidationError(errors.array()) 
   }
   if(!DbConnection){
     throw new DatabaseConnectionError();
   }
  const { email, password } = req.body;
  console.log('creting user...')
  return res.status(201).send({})
})

export { router as signupRouter };

