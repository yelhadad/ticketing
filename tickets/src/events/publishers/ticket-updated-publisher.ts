import { Stan } from "node-nats-streaming";
import { Subjects, TicketUpdatedEvent, Publisher } from "@ye-ticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {

  readonly subject: Subjects.ticketUpdated;

  constructor(client: Stan) {
    super(client)
    this.subject = Subjects.ticketUpdated;
  }

  public publish(data: { id: string; title: string; price: number; userId: string; }): Promise<void> {
    return super.publish(data)
  }
  
}