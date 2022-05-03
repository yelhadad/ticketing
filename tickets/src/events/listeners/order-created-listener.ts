import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@ye-ticketing/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // find the Ticket
    const ticket = await Ticket.findById(data.ticket.id)
    // if no Ticket throw error
    if(!ticket){
      throw new Error('Ticket was not found');
    }
    // update the ticket orderId
    ticket.set({orderId: data.id});

    // save the Ticket
    await ticket.save();
    // publish new ticket updated event
    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
      title: ticket.title,
      orderId: ticket.orderId
    })

    // acks the message
    msg.ack();
  }
}