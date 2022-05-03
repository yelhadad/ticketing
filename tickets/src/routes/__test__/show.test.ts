import request from 'supertest'
import { app } from '../../app';

it('returns 404 if the ticket was not found', async () => {
  await request(app)
    .get('/api/tickets/sjdbsdiugbdsuibgdsuigbds')
    .set('Cookie', global.signin())
    .expect(404)
})

it('returns 200 if the ticket was found', async () => {
  const title = 'new title!'
  const price = 22
  const response =  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price
    })
    .expect(201)
    console.log(response.body.id)
    const ticketRespose = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .set('Cookie', global.signin())
      .expect(200)

      expect(ticketRespose.body.title).toEqual(title);
      expect(ticketRespose.body.price).toEqual(price);
})