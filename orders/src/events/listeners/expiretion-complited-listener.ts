import { ExpirationCompletedEvent, Listener, OrderStatus, Subjects } from "@ye-ticketing/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { queueGroupName } from "./queue-group-name";

export class ExpirationCompletedListener extends Listener<ExpirationCompletedEvent>{
  subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompletedEvent['data'], msg: Message) {
    
    const order = await Order.findById(data.orderId).populate('ticket')

    if(!order){
      throw new Error('order not found');
    };

    order.set({
      status: OrderStatus.Cancelled,
    })

    await order.save();

    new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      }
    })

    msg.ack();
  }
}