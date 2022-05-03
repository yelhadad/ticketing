import { Listener, OrderStatus, PaymentCreatedEvent, Subjects } from "@ye-ticketing/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
  subject: Subjects.paymentCreated = Subjects.paymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: { id: string; orderId: string; stripeId: string; }, msg: Message) {
    const order = await Order.findById(data.orderId);

    if(!order){
      throw new Error('order was not found')
    };

    order.set({status: OrderStatus.Complete});
    await order.save();

    msg.ack();
  }
}