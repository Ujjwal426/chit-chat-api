import { Schema, model } from 'mongoose';
import { User } from '../interfaces';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

export default model<User>('User', userSchema);
