import mongoose from "mongoose";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

//An inteface that describes the properties 
// that are requied to create new ticket
// TicketAttrs: The attributes to create new ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// An inteface that describes the properties
// that a Ticket document has
// TicketDocument: A singel record in a collection.
interface TicketDoc extends mongoose.Document{
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
}


// An intefase that describe the propeties
// that a Ticket model has
// TicketModel: desribes the entire collection
interface TicketModel extends mongoose.Model<TicketDoc>{
  build(attrs: TicketAttrs): TicketDoc
}


const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  orderId: {
    type: String
  }
},{
     toJSON: {
    transform: (doc, ret) => {
     // delete ret.__v;
      ret['id'] = ret._id
      delete ret._id
    }
  }
})

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket };