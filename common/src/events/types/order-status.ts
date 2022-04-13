export enum OrderStatus {
  // When the order has been created, but the
  // ticket it is trying to order has not been reserved
  Created = 'created',

  // The ticket the order is trying to reserve has already 
  // been reserved, ot when the user has cancelled the order
  // The order expires before payment
  Cancelled = 'cancelled',

  // The oder has successfuly reserved the ticket
  AwaitingPayment = 'awaiting:payment',
  
  // The order has reserved the ticket and the user has 
  // provided payment successfuly
  Complete = 'complete'
}