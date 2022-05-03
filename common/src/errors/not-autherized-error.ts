import { CustomError } from "./customError";

export class notAutherizedError extends CustomError {
  statusCode = 401;
  constructor(public message: string){
    super(message)

    Object.setPrototypeOf(this, notAutherizedError.prototype);
  }  
  serializeErrors(){
    return [{message: this.message}]
  } 
}