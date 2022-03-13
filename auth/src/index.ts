import { ServerError } from './errors/server-error';
import mongoose from 'mongoose';
import { app } from './app'

const port = 4000;
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



