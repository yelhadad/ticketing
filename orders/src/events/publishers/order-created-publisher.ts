import { Stan } from "node-nats-streaming";
import { Publisher, OrderCreatedEvent, Subjects, OrderStatus } from "@ye-ticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated;

  constructor(client: Stan){
    super(client)
    this.subject = Subjects.OrderCreated
  }

  public publish(data: OrderCreatedEvent['data']): Promise<void> {
    return super.publish(data)
  }
} 

