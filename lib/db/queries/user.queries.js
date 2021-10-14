import User from '../models/user.model';

export const findUserByUsername = async (username, password = false) =>
  User.findOne({ username }, password && '+password').exec();

export const findUserById = async (id, password = false) =>
  User.findById(id, password && '+password').exec();

export const findUserByUsernameOpt = async (username, password = false) =>
  User.findOne({ username }, password && '+password')
    .lean()
    .exec();

export const findUserByIdOpt = async (id, password = false) =>
  User.findById(id, password && '+password')
    .lean()
    .exec();

export const existsUserById = async (id) => User.exists({ _id: id });
export const existsUserByUsername = async (username) =>
  User.exists({ username });

export async function createUser({
  username,
  firstname,
  lastname,
  password,
  role = 'user',
  posts = [],
  comments = [],
}) {
  const args = {
    username,
    firstname,
    lastname,
    password,
    role,
    posts,
    comments,
  };

  return User.create(args);
}

export const updateUserById = async (id, userData) =>
  User.findByIdAndUpdate(id, userData, { new: true }).lean().exec();

export const updateUserByUsername = async (username, userData) =>
  User.findOneAndUpdate({ username }, userData, { new: true }).lean().exec();

export const deleteUserById = async (id) =>
  User.findByIdAndDelete(id).lean().exec();

export const deleteUserByUsername = async (username) =>
  User.findOneAndDelete({ username }).lean().exec();
