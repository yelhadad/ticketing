import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './classes/ticket-created-listener'

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:31055'
});


const connection = stan.on('connect', () => {
  console.log('Listener connected to NATS')

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  })

  const listener = new TicketCreatedListener(stan)
  listener.listen();
});

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())

