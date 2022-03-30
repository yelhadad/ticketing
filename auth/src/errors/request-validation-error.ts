import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
  errors: ValidationError []
  //
  statusCode: number
  constructor(errors: ValidationError[]){
    super('there was an error in validation')
    this.errors = errors
    this.statusCode = 400
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  
  serializeErrors() {
    const formatErros = this.errors.map(error =>{
      return {message: error.msg, field: error.param}
    })
    return formatErros;
  }
  
}