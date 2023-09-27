/* eslint-disable no-param-reassign */
import { Schema, model } from 'mongoose';
import { User } from '@interfaces';

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
  profilePicture: {
    type: String,
  },
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
  },
});

export default model<User>('User', userSchema);
