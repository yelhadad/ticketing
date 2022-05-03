import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';

const tickedId = new mongoose.Types.ObjectId().toHexString();
const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'yoav',
    price: 200,
    id: new mongoose.Types.ObjectId().toHexString()
  });
  await ticket.save();
  return ticket;
}

it('feches orders for an particular user', async () => {
  // Create three tickets
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  // Create one order as user #1
  const user1 = global.signin();
  const user2 = global.signin();

  await request(app)
  .post('/api/orders')
  .set('Cookie', user1)
  .send({ticketId: ticket1.id})
  .expect(201)

  // Create two orders as User #2
  const { body: order1 } = await request(app)
  .post('/api/orders')
  .set('Cookie', user2)
  .send({ticketId: ticket2.id})
  .expect(201)

  const { body: order2 } = await request(app)
  .post('/api/orders')
  .set('Cookie', user2)
  .send({ticketId: ticket3.id})
  .expect(201)
  // Make request to get orders for User #2
  const response = await request(app)
  .get('/api/orders')
  .set("Cookie", user2)
  .expect(200);

  // Make sure we only got the orders forr User #2
  expect(response.body.length).toEqual(2);
  
  expect(order1.ticket.id).toEqual(response.body[0].ticket.id);
  expect(order2.ticket.id).toEqual(response.body[1].ticket.id);
  expect(order1.id).toEqual(response.body[0].id);


})
