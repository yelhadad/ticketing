import { Listener, OrderCancelledEvent, Subjects } from "@ye-ticketing/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'] , msg: Message) {
    // find the ticket
    const ticket = await Ticket.findById(data.ticket.id); 
    // if no ticket throw error
    if(!ticket){
      throw new Error('ticket not found');
    }
    // mark the ticket as cancelled
    ticket.set({orderId: null});
    // save the ticket
    ticket.save();

    // publish a ticket-updated-event:
    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    })
    // ack the message
    msg.ack();
  }
}