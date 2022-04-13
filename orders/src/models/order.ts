import mongoose from "mongoose";
import { OrderStatus} from '@ye-ticketing/common';
import { TicketDoc } from './ticket';
import { MongodOpts } from "mongodb-memory-server-core/lib/util/MongoInstance";
export { OrderStatus };

interface OrderAtts {
  userId: string;
  expiresAt: Date;
  status: OrderStatus
  ticket: TicketDoc
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  expiresAt: Date;
  status: OrderStatus;
  ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAtts): OrderDoc
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  }
}, {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      }
    }
  })

orderSchema.statics.build = (attrs: OrderAtts) => {
  return new Order(attrs);
 }

 const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema)

 export { Order };