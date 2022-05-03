import { OrderCancelledListener } from "../order-cancelled-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledEvent, OrderStatus } from "@ye-ticketing/common";
import mongoose from "mongoose";
import { Order } from "../../../models/order";


const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);
  // create a fake data event
  const data: OrderCancelledEvent['data'] = {
    version: 1,
    id: new mongoose.Types.ObjectId().toHexString(),
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
    }
  };
  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  const order = Order.build({
    id: data.id,
    version: 0,
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 20,
  })

  await order.save();

  return {listener, data, msg}
}

it('cancelles an order', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assertions to make sure a ticket ceated! 
  const order = await Order.findById(data.id);

  expect(order).toBeDefined();
  expect(order!.status).toEqual(OrderStatus.Cancelled);
})

it('acks the message' , async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  
  // write assertions to make sure ack function is called
  expect(msg.ack).toBeCalled();
});

