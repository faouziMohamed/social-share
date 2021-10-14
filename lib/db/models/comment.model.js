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

const Comment = model('Comment', commentSchema);

export default Comment;
