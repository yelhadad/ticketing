import mongoose from "mongoose";
import { Order } from './order';
import { OrderStatus } from '@ye-ticketing/common'

interface TicketAttrs {
  title: string,
  price: number
}

export interface TicketDoc extends mongoose.Document {
  title: string,
  price: number,
  isReserved(): Promise<boolean>
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }, 
  price: {
    type: Number,
    required: true,
    min: 0
  }  
}, {
  toJSON: {
    transform(ret, doc) {
      ret.id = ret._id,
      delete ret._id
    }
  }
})

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
}

// Run query to look at all orders. Find an order where the ticket
// is the ticket we just found *and* the orders status is *not* cancelled.
// If we find an order from that means the ticket *is* reserved

ticketSchema.methods.isReserved = async function() {
  // in this function this === to the Ticket Doc we call isReseved
    const existingOrder = await Order.findOne({
      ticket: this,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.Complete,
          OrderStatus.AwaitingPayment
        ]
      }
    })
  return !!existingOrder;
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket }