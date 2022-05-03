import { ServerError } from '@ye-ticketing/common';
import mongoose from 'mongoose';
import { app } from './app'
import { natsWrapper } from './nats-wrapper';
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';
import { ExpirationCompletedListener } from './events/listeners/expiretion-complited-listener';
import { PaymentCreatedListener } from './events/listeners/payment-created-listener';

const port = 4000;
const start = async () =>{
if(process.env.JWT_KEY === undefined || process.env.MONGO_URI === undefined ||
  process.env.NATS_CLUSTER_ID === undefined || process.env.NATS_URL === undefined ||
  process.env.NATS_CLIENT_ID === undefined) {
  throw new ServerError('error in creating envirorment varuble')
}
try {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('connecting to mongo')
} catch (error) {
  console.error(error)
}

try {
  await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID,
  process.env.NATS_URL)
  natsWrapper.client.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  })
  
  process.on('SIGINT', () => natsWrapper.client.close())
  process.on('SIGTERM', () => natsWrapper.client.close())
} catch (error) {
  console.error(error)
}

new TicketCreatedListener(natsWrapper.client).listen();
new TicketUpdatedListener(natsWrapper.client).listen();
new ExpirationCompletedListener(natsWrapper.client).listen();
new PaymentCreatedListener(natsWrapper.client).listen();

app.listen(port, () => console.log(`app is listning on port ${port}`))
}

start();



