import { ServerError } from '@ye-ticketing/common';
import mongoose from 'mongoose';
import { app } from './app'
import { natsWrapper } from './nats-wrapper';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';
import { OrderCreatedListener } from './events/listeners/order-created-listener';

const port = 4000;
console.log(process.env.STRIPE_KEY)
const start = async () =>{
    let envArr = [process.env.JWT_KEY, process.env.MONGO_URI, process.env.NATS_CLUSTER_ID,
    process.env.NATS_URL, process.env.NATS_CLIENT_ID]
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

  new OrderCreatedListener(natsWrapper.client).listen();
  new OrderCancelledListener(natsWrapper.client).listen();
  
} catch (error) {
  console.error(error)
}

app.listen(port, () => console.log(`app is listning on port ${port}`))
}

start();



