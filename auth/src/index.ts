import { ServerError } from '@ye-ticketing/common';
import mongoose from 'mongoose';
import { app } from './app'

const port = 4000;
const start = async () =>{
  console.log('starting....')
if(process.env.JWT_KEY === undefined || process.env.MONGO_URI === undefined){
  throw new ServerError('error in creating envirorment varuble')
}
try {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('connecting to mongo')
} catch (error) {
  console.error(error)
}
app.listen(port, () => console.log(`app is listning on port ${port}`))
}
start();



