import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

import { startCase } from '../../utils';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    role: { type: String, default: 'user' },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    toObject: {
      transform: function transform(doc, ret) {
        delete ret.__v;
      },
    },
    toJSON: {
      transform: function transform(doc, ret) {
        delete ret.__v;
      },
    },
  },
);

// Everytime a user is saved or the password is hashed
userSchema.pre('save', async function setPasswordHash(next) {
  if (!this.isModified('password')) return next();
  try {
    const password = await hashPassword(this.password);
    this.set({ password });
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.pre('save', function reformatValues(next) {
  if (this.isModified('username')) {
    this.username.toLowerCase();
  }

  if (this.isModified('firstname')) {
    this.set({ firstname: startCase(this.firstname) });
  }
  if (this.isModified('lastname')) {
    this.set({ lastname: startCase(this.lastname) });
  }
  return next();
});

userSchema.methods.comparePassword = async function comparePassword(password) {
  const hashedPassword = this.password;
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

// Use the existing model or create a new one if it doesn't exist
const User = global.User || model('User', userSchema);
global.User = User;
export default User;

export async function hashPassword(password = '') {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
