import { Schema } from 'mongoose';
import { User } from '../../entities/user';

const usersSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwd: {
    type: String,
    required: true,
  },

  name: String,

  surname: String,

  age: Number,

  films: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Character',
    },
  ],
});

usersSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.passwd;
  },
});

export const UserModel = model('User', usersSchema, 'users');
