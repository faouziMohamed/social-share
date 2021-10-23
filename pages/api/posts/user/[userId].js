import nextConnect from 'next-connect';

import { findPostsByUserId } from '../../../../lib/db/queries/post.queries';
import { existsUserById } from '../../../../lib/db/queries/user.queries';
import PostError from '../../../../lib/errors/post-error';
import auth from '../../../../middleware/authentication';
import { handleErrors } from '../[param]';

const handler = nextConnect().use(auth);
handler.get(async (req, res) => {
  try {
    const { userId = req?.user?._id || '' } = req.query;
    if (!userId) {
      const msg =
        'User id is required or you need to connect to get your posts';
      throw new PostError({ message: msg, code: 400 });
    }
    if (!(await existsUserById(userId))) {
      const message = 'Cannot find post for user which does not exist';
      throw new PostError({ message, code: 404 });
    }
    const posts = await findPostsByUserId(userId);
    res.status(200).json({ posts });
  } catch (e) {
    handleErrors(e, res);
  }
});

export default handler;
