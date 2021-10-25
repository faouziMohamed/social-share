import { model, Schema } from 'mongoose';

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true, unique: true },
    urlAltText: { type: String, default: '' },
    title: { type: String, required: true },
    text: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    reactions: {
      comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
      likes: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'User' },
          date: { type: Date, default: Date.now },
        },
      ],
      dislikes: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'User' },
          date: { type: Date, default: Date.now },
        },
      ],
      shares: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'User' },
          date: { type: Date, default: Date.now },
        },
      ],
    },
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

postSchema.index({ url: 1, author: 1, title: 1, date: -1 });

const Post = global.Post || model('Post', postSchema);
global.Post = Post;
export default Post;
