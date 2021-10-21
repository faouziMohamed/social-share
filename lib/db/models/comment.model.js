import { model, Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    reactions: {
      like: [
        { user: { type: Schema.Types.ObjectId, ref: 'User' }, date: Date.now },
      ],
      dislike: [
        { user: { type: Schema.Types.ObjectId, ref: 'User' }, date: Date.now },
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

const Comment = global.Comment || model('Comment', commentSchema);
global.Comment = Comment;
export default Comment;
