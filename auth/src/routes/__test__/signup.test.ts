import  request  from "supertest";
import { app } from '../../app'

it('returns a 201 on succesful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
})

it('returns a 400 when provided invalid email or password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'yoav',
      password: 'password'
    })
    .expect(400)

    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'sd'
      })
      .expect(400)
});

it('returns 201 when new user is created', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
})

it('returns 400 when the user already exists', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400)
});

