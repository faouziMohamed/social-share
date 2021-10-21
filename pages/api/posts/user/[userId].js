import nextConnect from 'next-connect';

import { findPostsByUserID } from '../../../../lib/db/queries/post.queries';
import { existsUserById } from '../../../../lib/db/queries/user.queries';
import PostError from '../../../../lib/errors/post-error';
import auth from '../../../../middleware/authentication';

const handler = nextConnect().use(auth);
handler.get(async (req, res) => {
  const { userId = req?.user._id } = req.query;
  if (!userId) {
    const msg = 'User id is required or you need to connect to get your posts';
    throw new PostError({ message: msg, code: 400 });
  }
  try {
    if (!(await existsUserById(userId))) {
      const message = 'Cannot find post for user which does not exist';
      throw new PostError({ message, code: 404 });
    }
    const data = await findPostsByUserID(userId);
    res.status(200).json({ data });
  } catch (e) {
    if (e instanceof PostError) {
      res.status(e.statusCode).json(e.toResponse());
      return;
    }
    res.status(e?.statusCode || 400).json({ error: e.message });
  }
});

export default handler;
