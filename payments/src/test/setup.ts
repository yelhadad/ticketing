import { MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

jest.mock('../nats-wrapper.ts')

let mongo: any

declare global {
  var signin: (id?: string) => string[];
}

//let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf'

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri);
})

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections){
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
})

global.signin = (id) => {
  // creating jws payload
const payload = {
  id: id || new mongoose.Types.ObjectId().toHexString(),
  email: 'test@test.com'
}
// creating the jwt token
const jwtWebToken = jwt.sign(payload, process.env.JWT_KEY!)

// build session Object { jwt: MY_JWT}
const session = {jwt: jwtWebToken}

// Turn that session to JSON
const sessionJson = JSON.stringify(session);

// take JSON and encode it as base 64
const base64 = Buffer.from(sessionJson).toString('base64');

//return a string thats the cookie with the encoded data
// we return array because jest like cookies as array
return [`session=${base64}`];

}

 
