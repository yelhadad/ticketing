import request from 'supertest';
import { app } from '../../app';

it('can fetch list of tickets', async () => {
  const x = 5
  const title = 'title number: '
  for(let i = 0; i > x; i++)
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: title + i,
      price: i
    })
    .expect(201);

    const response = await request(app)
      .get('/api/tickets')
      .set('Cookie', global.signin())
      .expect(200);

      expect(response.body.length).toEqual(5);
      expect(response.body[3].price).toEqual(4);
})