
export class RequestValidationError extends Error {
  reasons: {
    msg: string,
    param: string
  }

  constructor(reasons: {msg: string, param: string}){
    super()
    this.reasons = reasons;
  }
  
}