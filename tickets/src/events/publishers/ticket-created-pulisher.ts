import { Stan } from "node-nats-streaming";
import { Subjects, TicketCreatedEvent, Publisher } from "@ye-ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {

  readonly subject: Subjects.ticketCreated;

  constructor(client: Stan) {
    super(client)
    this.subject = Subjects.ticketCreated;
  }

  public publish(data: { id: string; title: string; price: number; userId: string; }): Promise<void> {
    return super.publish(data)
  }
  
}