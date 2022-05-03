import { natsWrapper } from "../../../nats-wrapper";
import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { TicketUpdatedEvent } from "@ye-ticketing/common";

const setup = async () => {
  // create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // create a fake data event
  const data: TicketUpdatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'updated',
    price: 23,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 1
  };
  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  await Ticket.build({
    id: data.id,
    title: 'new',
    price: 10
  }).save();

  return {listener, data, msg}
}

it('updates and saves a ticket', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assertions to make sure a ticket ceated! 
  const ticket = await Ticket.findById(data.id);
  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);

  
})

it('acks the message' , async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assertions to make sure a ticket ceated! 
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  // write assertions to make sure ack function is called
  expect(msg.ack).toBeCalled();
});


it(`does'nt acks the message if wrong version is provided` , async () => {
  const { listener, data, msg } = await setup();

  data.version = 10
  // call the onMessage function with the data object + message object
  try {
    await listener.onMessage(data, msg);
  } catch (error) {}
  // write assertions to make sure a ticket ceated!   
  expect(msg.ack).not.toBeCalled();
});

