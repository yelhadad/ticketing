import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './classes/ticket-created-pulisher';

console.clear();

const data = {
  id: '123',
  title: 'first ticket in the event bus',
  price: 12
}

// stan is could be refer as a client
const stan = nats.connect('ticketing', 'abc', {
  // the actual port is 4222
  url: 'http://localhost:31929'
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS')
  const publisher = new TicketCreatedPublisher(stan)
  try {
    await publisher.publish(data)
  } catch (error) {
    console.log(error)
  }
})

