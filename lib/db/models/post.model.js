import { model, Schema } from 'mongoose';

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    body: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    reactions: {
      like: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'User' },
          date: { type: Date, default: Date.now },
        },
      ],
      dislike: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'User' },
          date: { type: Date, default: Date.now },
        },
      ],
    },
    shares: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
      },
    ],
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

const Post = global.Post || model('Post', postSchema);
global.Post = Post;
export default Post;
