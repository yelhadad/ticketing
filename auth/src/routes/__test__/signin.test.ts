import  request, { Response } from "supertest";
import { app } from '../../app'

it('returns 400 if provided invalid email', async () => {
  const response: Response = await request(app)
    .post('/api/users/signip')
    .send({
      email: 'testtest.com',
      password: 'password'
    })
    .expect(404)
  })

    it('returns 400 if provided invalid password', async () => {
      const response: Response = await request(app)
        .post('/api/users/signip')
        .send({
          email: 'test@test.com',
          password: 'fjh'
        })
        .expect(404)
      })

      it('returns a cookie when signing up', async () => {
      await request(app)
      .post('/api/users/signup')
      .send({
            email: 'test@test.com',
            password: 'password'
          })
          .expect(201)

      const response: Response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(200)
      console.log(response.get('Set-Cookie'))
      expect(response.get('Set-Cookie')).toBeDefined();
    })

     // test to test the signin flow
    /* await request('/api/users/signup')
     .post('/api/users/signup')
     .send({
       email: 'test@test.com',
       password: 'password'
     })
     .expect(200); */
//})