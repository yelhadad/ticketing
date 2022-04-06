import { Stan } from "node-nats-streaming"
import { Subjects } from "../events/subjects"

interface Event {
  subject: Subjects,
  data: any
}

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];

  constructor(protected client: Stan) {}

  publish(data: T['data']) {
    this.client.publish(this.subject, JSON.stringify(data), () => {
      console.log('event published')
    })
  }
}