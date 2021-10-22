import Post from '../models/post.model';
import User from '../models/user.model';
import { updateUserById } from './user.queries';

export const createPost = async ({ title, text, url, urlAltText, author }) => {
  const post = await Post.create({ title, text, url, urlAltText, author });
  const user = await updateUserById(author, { $push: { posts: post._id } });
  return { post, user };
};

export const updatePostById = async (id, query = {}) =>
  Post.findByIdAndUpdate(id, query, { new: true }).lean().exec();

export const findPostById = async (id) => Post.findById(id).lean().exec();
export const findPostByUrl = async (url) => Post.findOne({ url }).lean().exec();
export const findPostsByAuthor = async (author) =>
  Post.find({ author }).lean().exec();

export const findPostsByUserID = async (_id) => {
  return User.aggregate([
    { $match: { _id } },
    {
      $lookup: {
        from: 'posts',
        foreignField: 'posts',
        localField: 'author',
        as: 'posts',
      },
    },
    { $unwind: '$posts' },
    { $project: { 'posts.__v': 0 } },
    { $sort: { 'posts.date': -1, 'posts._id': -1 } },
    {
      $addFields: {
        metadata: {
          author: '$posts.author',
          username: '$username',
          firstname: '$firstname',
          lastname: '$lastname',
          avatar: '$avatar',
          dateAdded: '$posts.date',
        },
        body: {
          text: '$posts.text',
          title: '$posts.title',
          url: '$posts.url',
          urlAltText: '$posts.urlAltText',
        },
        reactions: '$posts.reactions',
        stats: {
          likes: { $size: '$posts.reactions.likes' },
          dislikes: { $size: '$posts.reactions.dislikes' },
          comments: { $size: '$posts.reactions.comments' },
          shares: { $size: '$posts.reactions.shares' },
        },
      },
    },
    { $project: { _id: 1, metadata: 1, body: 1, reactions: 1, stats: 1 } },
  ]);
};

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