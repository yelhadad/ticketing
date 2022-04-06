import { Stan, Message } from 'node-nats-streaming';
import { BaseEvent } from '../interfaces/base-event';


export abstract class Listener<T extends BaseEvent> {
  abstract subject: T['subject'];
  abstract onMessage(data: T['data'], msg: Message): void;
  abstract queueGroupName: string;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  private subscribtionOptions() {
    return this.client.subscriptionOptions()
      .setAckWait(this.ackWait)
      // allows to nats to try and send the same event if it didn't recieved well
      // in the client
      .setManualAckMode(true)
      // alows to nats send all the events that were published
      .setDeliverAllAvailable()
      // alow nats to send only the events that the listener missed
      // must work with queue group and setDeliverAllAvailable()
      .setDurableName(this.queueGroupName)
  }; 

   listen() {
    const subscribtion = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscribtionOptions()
    );

    subscribtion.on('message', (msg: Message) => {
      console.log(
        `Message received ${this.subject} / ${this.queueGroupName}`
      )

      const parseData = this.parseMessage(msg);
      this.onMessage(parseData, msg)
    })
  }

  private parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
    ? JSON.parse(data)
    : JSON.parse(data.toString('utf-8'))
  } 
}