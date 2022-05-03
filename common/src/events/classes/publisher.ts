import { Stan } from "node-nats-streaming"
import { BaseEvent } from "../interfaces/base-event";

export abstract class Publisher<T extends BaseEvent> {
  abstract subject: T['subject'];

  constructor(protected client: Stan) {}

   publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if(err) {
          reject(err);
        }
        console.log('event published')
        resolve();
      })
    })
    
  }
}