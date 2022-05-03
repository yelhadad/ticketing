import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket' 
import { natsWrapper} from '../../nats-wrapper'

it('checks if the app listens to /api/tickets rout', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .send({});
  
  expect(response.statusCode).not.toEqual(404)
});

it('can only accessed if the user is signed in', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .send({})
  .expect(401);
});

it('direct access if the user is signin', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({})
  expect(response.statusCode).not.toEqual(401)
})

it('returns error if invalid ticket is provided', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: '',
    price: 10
  })
  .expect(400)
})

it('returns error if invalid price is provided', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'football',
    price: -10
  })
  .expect(400)
});


it('it creates a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = 'football and soccer'

  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title,
    price: 10
  })
  .expect(201)

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(10);
});

it('published event after ticket was created', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'sdjghd',
    price: 10
  })
  .expect(201)
   expect(natsWrapper.client.publish).toHaveBeenCalled();
})





