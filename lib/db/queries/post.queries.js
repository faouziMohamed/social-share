import Post from '../models/post.model';
import User from '../models/user.model';
import { updateUserById } from './user.queries';

export const createPost = async ({ title, body, url, author }) => {
  const post = await Post.create({ title, body, url, author });
  const user = await updateUserById(author, { $push: { posts: post._id } });
  return { post, user };
};

export const updatePostById = async (id, query = {}) =>
  Post.findByIdAndUpdate(id, query, { new: true }).lean().exec();

export const findPostById = async (id) => Post.findById(id).lean().exec();
export const findPostByUrl = async (url) => Post.findOne({ url }).lean().exec();
export const findPostsByAuthor = async (author) =>
  Post.find({ author }).lean().exec();

export const findPostsByUserID = async (id) =>
  User.findById(id)
    .populate({ path: 'posts', select: '-author' })
    .select('-role -__v')
    .lean()
    .exec();

export const deletePostById = async (id) => {
  const post = await Post.findByIdAndDelete(id).lean().exec();
  const user = await updateUserById(post.author, { $pull: { posts: id } });
  return { post, user };
};

export const deletePostsByAuthor = async (author) => {
  const posts = await Post.find({ author }).lean().exec();
  const user = await updateUserById(author, { $set: { posts: [] } });
  return { posts, user };
};

export const deletePostsByUrl = async (url) => {
  const post = await findPostByUrl(url);
  const user = await updateUserById(post.author, {
    $pull: { posts: post._id },
  });
  return { post, user };
};

export const existsPostById = async (id) => Post.exists({ _id: id });
export const existsPostByUrl = async (url) => Post.exists({ url });
export const existsPostByAuthorAndUrl = async (author, url) =>
  Post.exists({ author, url });
