import { OrderCancelledListener } from "../order-canceled-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledEvent, OrderStatus } from "@ye-ticketing/common";
import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";


const setup = async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: 'new',
    price: 23,
    userId: 'fjsfjs'
  })
  await ticket.save();
  
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);
  // create a fake data event
  const data: OrderCancelledEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: ticket.id,
    }
  };
  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return {listener, data, msg}
}

it('locks the ticket', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assertions to make sure the ticket is not locked! 
  let ticket;
  try {
    ticket = await Ticket.findById(data.ticket.id);
  } catch (error) {}

  expect(ticket?.orderId).not.toBeDefined();
})

it('acks the message' , async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  
  expect(msg.ack).toBeCalled();
});

it('published event after creating the order', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
  //@ts-ignore
  console.log(natsWrapper.client.publish.mock.calls);
  
  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(ticketUpdatedData.orderId).toEqual(null);

})