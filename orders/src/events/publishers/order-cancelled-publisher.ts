import { Stan } from "node-nats-streaming";
import { Publisher, Subjects, OrderCancelledEvent } from "@ye-ticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled;

  constructor(client: Stan) {
    super(client);
    this.subject = Subjects.OrderCancelled
  };

  public publish(data: OrderCancelledEvent['data']): Promise<void> {
    return super.publish(data);
  };
}