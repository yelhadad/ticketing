import { Listener } from "./Listener";
import nats, { Stan} from 'node-nats-streaming'
import { TicketCreatedEvent } from "../events/ticket-created-event";
import { Subjects } from "../events/subjects";

export class TicketCreatedListener extends Listener <TicketCreatedEvent> {

  readonly subject: Subjects.ticketCreated;
  queueGroupName: string;

  constructor(client: Stan) {
    super(client)
    this.subject = Subjects.ticketCreated
    this.queueGroupName = 'order-create-qg'
  }

  onMessage(data: TicketCreatedEvent['data'], msg: nats.Message): void {
    console.log('message recieved' + data)

    msg.ack();
  }
}