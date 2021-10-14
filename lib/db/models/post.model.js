import { model, Schema } from 'mongoose';

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: Date, default: Date.now },
    reactions: {
      like: [
        { user: { type: Schema.Types.ObjectId, ref: 'User' }, date: Date.now },
      ],
      dislike: [
        { user: { type: Schema.Types.ObjectId, ref: 'User' }, date: Date.now },
      ],
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
);

const Post = model('Post', postSchema);
export default Post;
