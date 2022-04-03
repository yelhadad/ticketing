import mongoose from "mongoose";

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
}


// An intefase that describe the propeties
// that a Ticket model has
// TicketModel: desribes the entire collection
interface TicketModel extends mongoose.Model<TicketDoc>{
  build(attrs: TicketAttrs): TicketDoc
}

interface RetTicketDoc extends mongoose.Document{
  title?: string
  price?: number
  id?: string
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
  } 
},{
     toJSON: {
    transform: (doc: TicketDoc, ret: RetTicketDoc) => {
     // delete ret.__v;
      ret['id'] = ret._id
      delete ret._id
    }
  }
}
)
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export { Ticket };