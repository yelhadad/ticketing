import { ExpirationCompletedListener } from "../expiretion-complited-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { ExpirationCompletedEvent, OrderStatus, Subjects } from "@ye-ticketing/common";
import mongoose from "mongoose";
import { Order } from "../../../models/order";
import { Ticket } from "../../../models/ticket";


const setup = async () => {
  // create an instance of the listener
  const listener = new ExpirationCompletedListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'mew',
    price: 10
  });
  await ticket.save();

  const order = Order.build({
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket
  })
  await order.save()
  // create a fake data event
  const data: ExpirationCompletedEvent['data'] = {
    orderId: order.id,
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  
  return {ticket, listener, data, msg, order}
}

it('cancels the order', async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  const cancelledOrder = await Order.findById(order.id);

  expect(cancelledOrder!.status).toEqual(OrderStatus.Cancelled);
})

it('acks the message' , async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg)

  expect(msg.ack).toBeCalled();
});

it('publish event' , async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg)

  expect(natsWrapper.client.publish).toHaveBeenCalled()
});


