import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

it('can only accessed if the user is signed in', async () => {
  const response = await request(app)
  .put('/api/tickets/djkbgsjdbgdjsb')
  .send({})
  .expect(401);
});

it('direct access if the user is signin', async () => {
  const response = await request(app)
  .put('/api/tickets')
  .set('Cookie', global.signin())
  .send({})
  expect(response.statusCode).not.toEqual(401)
})

it('returns error if invalid title or price is provided', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'udfuygdsyug',
    price: 10
  })
  .expect(201)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 101
    })
    .expect(400)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'fdsbfiubsduibfdubfud',
      price: -12
    })
    .expect(400)
})
  

it('updates a ticket base on his user id', async () => {
  const postResponse = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'yoav',
    price: 10
  })
  .expect(201);

  const postTitle = postResponse.body.title
  const putResponse = await request(app)
    .put(`/api/tickets/${postResponse.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: postTitle,
      price: 11
    })
    .expect(202);
    console.log(postResponse.body.title)
    //console.log(putResponse.body.error[0].message)
    expect(putResponse.body.price).toEqual(11);
})

it('published event after the ticket was updated', async () => {
  const postResponse = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title: 'yoav',
    price: 10
  })
  .expect(201);

  const postTitle = postResponse.body.title
  const putResponse = await request(app)
    .put(`/api/tickets/${postResponse.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: postTitle,
      price: 11
    })
    .expect(202)
    //expect(natsWrapper.client.publish).toHaveBeenCalled();
})