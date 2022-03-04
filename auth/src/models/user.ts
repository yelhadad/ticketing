import mongoose from "mongoose";
import { Password } from "../services/password";

//An inteface that describes the properties 
// that are requied to create new user

interface UserAttrs {
  email: string;
  password: string
}

// An intefase that describe the propeties
// that a user model has
interface UserModel extends mongoose.Model<UserDoc>{
  build(attrs: UserAttrs): UserDoc
}

// An inteface that describes the properties
// that a User document has
interface UserDoc extends mongoose.Document{
  email: string;
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

//seems that this method doesnt work now
userSchema.pre('save', async function (done) {
  if(this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed);
  }

  done();
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User };