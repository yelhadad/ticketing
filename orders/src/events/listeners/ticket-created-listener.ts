import { Message } from "node-nats-streaming";
import { Listener, TicketCreatedEvent, Subjects } from "@ye-ticketing/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.ticketCreated = Subjects.ticketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id, title,
      price
    });
    await ticket.save()
    
    msg.ack();
  }
}