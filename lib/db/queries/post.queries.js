import { Types } from 'mongoose';

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

export const findPostById = async (_id) => {
  return Post.aggregate([
    { $match: { _id: Types.ObjectId(_id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $addFields: {
        metadata: {
          author: '$author',
          postId: '$_id',
          username: '$user.username',
          firstname: '$user.firstname',
          lastname: '$user.lastname',
          avatar: '$user.avatar',
          dateAdded: '$date',
        },
        body: {
          text: '$text',
          title: '$title',
          url: '$url',
          urlAltText: '$urlAltText',
        },
        reactions: '$reactions',
        stats: {
          comments: { $size: '$reactions.comments' },
          likes: { $size: '$reactions.likes' },
          dislikes: { $size: '$reactions.dislikes' },
          shares: { $size: '$reactions.shares' },
        },
      },
    },
    { $project: { _id: 0, metadata: 1, body: 1, reactions: 1, stats: 1 } },
  ]);
};

export const findPostByUrl = async (url) => Post.findOne({ url }).lean().exec();
export const findPostsByAuthor = async (author) =>
  Post.find({ author }).lean().exec();

// export const findPostsByUserId = async (_id) => {
export const findPostsByUserId = async () => {
  return User.aggregate([
    // { $match: { _id } },
    {
      $lookup: {
        from: 'posts',
        let: { uid: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$author', '$$uid'],
              },
            },
          },
        ],
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
          postId: '$posts._id',
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
          comments: { $size: '$posts.reactions.comments' },
          likes: { $size: '$posts.reactions.likes' },
          dislikes: { $size: '$posts.reactions.dislikes' },
          shares: { $size: '$posts.reactions.shares' },
        },
      },
    },
    { $project: { _id: 1, metadata: 1, body: 1, reactions: 1, stats: 1 } },
  ]);
};

export const updatePostLikesById = async (pid, { uid, like, dislike }) => {
  let $addToSet;
  let $pull;
  if (like) {
    $addToSet = { 'reactions.likes': { user: uid } };
    $pull = { 'reactions.dislikes': { user: uid } };
  } else if (dislike) {
    $addToSet = { 'reactions.dislikes': { user: uid } };
    $pull = { 'reactions.likes': { user: uid } };
  } else {
    $pull = {
      'reactions.likes': { user: uid },
      'reactions.dislikes': { user: uid },
    };
    return Post.findByIdAndUpdate(pid, { $pull }, { new: true }).lean().exec();
  }
  return Post.findByIdAndUpdate(pid, { $addToSet, $pull }, { new: true })
    .lean()
    .exec();
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
export const existsPostByUsername = async (username) =>
  Post.exists({ username });
