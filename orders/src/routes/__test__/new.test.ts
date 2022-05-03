import request from "supertest";
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';
import { EXPERATION_WINDOW_SECONDS } from "../new";
import mongoose from "mongoose";

const ticketId = new mongoose.Types.ObjectId().toHexString()
const experation = new Date();
experation.setSeconds(experation.getSeconds() + EXPERATION_WINDOW_SECONDS);

it('checks if the app listens to /api/orders rout', async () => {
  const response = await request(app)
  .post('/api/orders')
  .send({});
  
  expect(response.statusCode).not.toEqual(404)
});

it('can only accessed if the user is signed in', async () => {
  const response = await request(app)
  .post('/api/orders')
  .send({})
  .expect(401);
});

it('direct access if the user is signin', async () => {
  const response = await request(app)
  .post('/api/orders')
  .set('Cookie', global.signin())
  .send({ticketId: ticketId})
  expect(response.statusCode).not.toEqual(401)
})

it("returns error if tickedId wasn't provided", async () => {
  const response = await request(app)
  .post('/api/orders')
  .set('Cookie', global.signin())
  .send({})
  .expect(400);
})

it("returns error if the ticket does'nt exists", async () => {
  await request(app)
  .post('/api/orders')
  .set('Cookie', global.signin())
  .send({
    ticketId: 'gdjbsdgjbdsj'
  })
  .expect(404)
})

it('returns error if the ticket is already reseved', async () => {
  const ticket = Ticket.build({
    title: 'yoav',
    price: 5,
    id: 'sjfsjf'
  });
  await ticket.save();
  const order = Order.build({
    userId: 'sfhbsh',
    status: OrderStatus.Complete,
    expiresAt: experation,
    ticket: ticket
  })
  await order.save();
  const response = await request(app)
  .post('/api/orders')
  .set('Cookie', global.signin())
  .send({
    ticketId: ticket.id
  })
  .expect(400);
})

it('ables to create order successfuly', async () => {
  const ticket = Ticket.build({
    title: 'yoav',
    price: 5,
    id: ticketId
  });
  await ticket.save();
  const response = await request(app)
  .post('/api/orders')
  .set('Cookie', global.signin())
  .send({
    ticketId: ticket.id
  })
  .expect(201);
  console.log(response.body)
})