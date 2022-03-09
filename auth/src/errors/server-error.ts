import { CustomError } from "./customError";

export class ServerError extends CustomError{
  statusCode = 500
  message: string;
  constructor(message: string){
    super(message)

    this.message = message;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
  
  
  serializeErrors(){
    return [{message: this.message}]
  }
  
  }
