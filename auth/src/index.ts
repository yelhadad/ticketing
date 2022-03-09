import express from 'express';
import 'express-async-errors'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewere/error-handler';
import { NotFoundError } from './errors/not-found-error';
import cookieSession from 'cookie-session';
import { ServerError } from './errors/server-error';


const port = 4000;
const app = express();
// awares express of the proxy that ingress ngnix
// creates, by default express won't trust this proxy
app.set('trust proxy', true); 
app.use(bodyParser.json());
// using cookies
app.use(
  cookieSession({
  signed: false, // don't send a cookie with the same name
  secure: true // send cookies only with https 
})
)

// to test the ingress
//app.get('/', (req, res) =>{
//  res.send('hi this is working')
//})

app.use(signoutRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(signupRouter);
app.use(errorHandler)

app.all('*', async () =>{
  throw new NotFoundError
})

const start = async () =>{
  if(process.env.JWT_KEY === undefined){
    throw new ServerError('error in creating envirorment varuble')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('connecting to mongo')
  } catch (error) {
    console.error(error)
  }
  app.listen(port, () => console.log(`app is listning on port ${port}`))
}
start();



