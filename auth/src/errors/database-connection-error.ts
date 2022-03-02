import { CustomError } from "./customError"

export class DatabaseConnectionError extends CustomError{
  reason = 'error conectiong to mongo'
  statusCode = 500

  constructor(){
    super('unable to connect to mongo')
 
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return [{message: this.reason, field: "database"}]; 
  }
}

