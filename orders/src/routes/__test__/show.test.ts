import request from "supertest";
import { app } from '../../app';
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";
import  mongoose from 'mongoose'

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'yoav',
    price: 200,
    id: new mongoose.Types.ObjectId().toHexString()
  });
  await ticket.save();
  return ticket;
}

it('returns 400 if the order not found', async () => {
  const user1 = global.signin();

  await request(app)
  .get('/api/orders/djjfdbdjfd')
  .set('Cookie', user1)
  .expect(400)
})

it('returns 401 if the user is not autherised to view the order',
async () => {
  const user1 = global.signin();
  const ticket = await buildTicket();
  // I could just have post request
  const order = Order.build({
    userId: 'fjdbgjdbs', // doesnt matter what the id is
    expiresAt: new Date(),
    status: OrderStatus.Complete,
    ticket
  });
  await order.save();
  await request(app)
  .get(`/api/orders/${order.id}`)
  .set('Cookie', user1)
  .expect(401);
})

it('returns 200 and the ticket',
async () => {
  const user1 = global.signin();
  const ticket = await buildTicket();
  const response = await request(app)
  .post(`/api/orders`)
  .set('Cookie', user1)
  .send({
    ticketId: ticket.id
  })
  .expect(201);
  console.log(response.body)

  const { body } = await request(app)
  .get(`/api/orders/${response.body.id}`)
  .set('Cookie', user1)
  .expect(200);
  expect(body.id).toEqual(response.body.id)
})