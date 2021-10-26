import Post from '../models/post.model';
import User from '../models/user.model';

export async function createUser({
  username,
  firstname,
  lastname,
  password,
  role = 'user',
  posts = [],
  comments = [],
}) {
  return User.create({
    username,
    firstname,
    lastname,
    password,
    role,
    posts,
    comments,
  });
}

export const updateUserById = async (id, query = {}) =>
  User.findByIdAndUpdate(id, query, { new: true }).lean().exec();

export const updateUserByUsername = async (username, query = {}) =>
  User.findOneAndUpdate({ username }, query, { new: true }).lean().exec();

export const existsUserById = async (id) => User.exists({ _id: id });
export const existsUserByUsername = async (username) =>
  User.exists({ username });

export const findUserByUsername = async (username, password = false) =>
  User.findOne({ username }, password && '+password').exec();

export const findUserById = async (id, password = false) =>
  User.findById(id, password && '+password').exec();

export const findUserByUsernameOpt = async (username, password = false) =>
  User.findOne({ username }, password && '+password')
    .populate({ path: 'posts', select: '-__v -author' })
    .select('-__v')
    .lean()
    .exec();

export const findUserByIdOpt = async (id, password = false) =>
  User.findById(id, password && '+password')
    .populate({ path: 'posts', select: '-__v -author' })
    .select('-__v')
    .lean()
    .exec();

export const getUserBasicInfoById = async (_id) =>
  User.aggregate([{ $match: { _id } }]);

export const deleteUserById = async (id) => {
  const user = await User.findByIdAndDelete(id).lean().exec();
  if (!user) return false;
  const posts = await Post.deleteMany({ author: id }).lean().exec();
  return { user, posts };
};

export const deleteUserByUsername = async (username) => {
  const user = await User.findOneAndDelete({ username }).lean().exec();
  if (!user) return false;
  const posts = await Post.deleteMany({ author: user._id }).lean().exec();
  return { user, posts };
};
