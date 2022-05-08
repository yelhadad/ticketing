import { natsWrapper } from './nats-wrapper';
import { ServerError } from '@ye-ticketing/common';
import { OrderCreatedListener } from './events/listeners/order-created-listener';

const start = async () =>{
if(process.env.NATS_CLUSTER_ID === undefined || process.env.NATS_URL === undefined ||
  process.env.NATS_CLIENT_ID === undefined) {
  throw new ServerError('error in creating envirorment varuble')
}
//
try {
  await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID,
  process.env.NATS_URL)
  natsWrapper.client.on('close', () => {
    console.log('NATS connection closed!!');
    process.exit();
  })
  
  process.on('SIGINT', () => natsWrapper.client.close())
  process.on('SIGTERM', () => natsWrapper.client.close())

  new OrderCreatedListener(natsWrapper.client).listen();
} catch (error) {
  console.error(error)
}
}
//
start();



