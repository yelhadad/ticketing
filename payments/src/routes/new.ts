import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotFoundError, requireAuth, validateRequest, BadRequestError, currentUser, notAutherizedError, OrderStatus } from '@ye-ticketing/common';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { Payment } from '../models/payment';

const router = express.Router();

router.post('/api/payments',
requireAuth,
[
  body('token')
    .not()
    .isEmpty()
    .withMessage('no token provided'),
  body('orderId')
    .not()
    .isEmpty()
    .withMessage('orderId was not provided')

],
validateRequest,

async (req: Request, res: Response) => {
  const { token, orderId } = req.body
  // make sure the order exists
  const order = await Order.findById(orderId);
  if(!order){
    throw new NotFoundError();
  }

  // make sure the order belongs to the user
  if(order.userId !== req.currentUser!.id){
    console.log(req.currentUser!.id)
    console.log(order.userId)
    throw new notAutherizedError('this order does not belong for current user!')
  };

  //make sure the order is not cancelled
  if(order.status === OrderStatus.Cancelled){
    return new BadRequestError('unable to pay cancelled order')
  };

  const charge = await stripe.charges.create({
    currency: 'usd',
    amount: order.price * 100,
    source: token,
    description: `charged ${order.price} from user: ${order.userId}`
  })

  const payment = Payment.build({
    orderId,
    stripeId: charge.id
  })
  await payment.save();

  await new PaymentCreatedPublisher(natsWrapper.client).publish({
    id: payment.id,
    orderId: payment.orderId,
    stripeId: payment.stripeId,
  });

  res.status(201).send({payment});
})

export { router as createdChargeRouter }