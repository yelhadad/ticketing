import express from 'express';
import 'express-async-errors'
import bodyParser from 'body-parser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewere/error-handler';
import { NotFoundError } from './errors/not-found-error';

const port = 4000;
const app = express();
app.use(bodyParser.json());


app.use(signoutRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(signupRouter);
app.use(errorHandler)

app.all('*', async () =>{
  throw new NotFoundError
})


app.listen(port, () => console.log(`app is listning on port ${port}`))