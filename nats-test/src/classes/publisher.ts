import { Stan } from "node-nats-streaming"
import { resolve } from "path";
import { Subjects } from "../events/subjects"

interface Event {
  subject: Subjects,
  data: any
}

export abstract class Publisher<T extends Event> {
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