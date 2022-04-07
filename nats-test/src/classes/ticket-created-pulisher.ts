import { Stan } from "node-nats-streaming";
import { Subjects } from "../events/subjects";
import { TicketCreatedEvent } from "../events/ticket-created-event";
import { Publisher } from "./publisher";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {

  readonly subject = Subjects.ticketCreated;

  constructor(client: Stan) {
    super(client)
  }
}