import mongoose from "mongoose";
import { Order } from './order';
import { OrderStatus } from '@ye-ticketing/common'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface TicketAttrs {
  id: string
  title: string,
  price: number
}

export interface TicketDoc extends mongoose.Document {
  title: string,
  price: number,
  isReserved(): Promise<boolean>;
  version: number;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByEvent(event: {id: string, version: number}): Promise<TicketDoc | null>
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
  },
  // custom ID for mongoose
  _id: {
    type: String,
    required: true,
  },  
}, {
  toJSON: {
    transform(ret, doc) {
      ret.id = ret._id,
      delete ret._id
    }
  },
})

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.findByEvent = (event: {id: string, version: number}) => {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1
  })
};

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price
  });
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

export const ticketIsReserved = async (ticket: TicketDoc) => {
  const existingOrder = await Order.findOne({
    Ticket: ticket,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.Complete,
        OrderStatus.AwaitingPayment
      ]
    }
  })

  return !!existingOrder
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket }