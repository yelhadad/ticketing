import mongoose from "mongoose";
import { OrderStatus} from '@ye-ticketing/common';
export { OrderStatus };
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderAtts {
  id: string;
  userId: string;
  status: OrderStatus;
  price: number;
  version: number;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  version: number;
  price: number;
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
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  // custom id
  _id: {
    type: String,
    required: true,
  },
}, {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      }
    }
  })

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAtts) => {
  const { id, userId, status, version, price } = attrs;
  return new Order({
    _id: id,
    userId,
    status,
    version,
    price,
  });
 }

 const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema)

 export { Order };