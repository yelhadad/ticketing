import request from 'supertest';
import { app } from '../../app';

it('can fetch list of tickets', async () => {
  const x = 6
  const title = 'title number: '
  const idArr: string[] = []
  for(let i = 1; i < x; i++){
    const postResponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: title + i,
      price: i
    })
    .expect(201);
    idArr.push(postResponse.body.id)
  }

    const response = await request(app)
      .get('/api/tickets')
      .set('Cookie', global.signin())
      .expect(200);

      expect(response.body.length).toEqual(5);
      expect(response.body[3].price).toEqual(4);
})