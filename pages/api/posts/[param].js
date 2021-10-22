import nextConnect from 'next-connect';

import { addPost } from '../../../controllers/posts/posts.controller';
import {
  existsPostById,
  findPostById,
} from '../../../lib/db/queries/post.queries';
import PostError from '../../../lib/errors/post-error';
import auth from '../../../middleware/authentication';

const handler = nextConnect().use(auth);

handler.get(async (req, res) => {
  try {
    const { param: id = req?.user._id } = req.query;
    if (!id) {
      const message = 'A post ID is required, but nothing was provided';
      throw new PostError({ message, code: 400 });
    }

    if (!(await existsPostById(id))) {
      const message = `Post with ID ${id} does not exist`;
      throw new PostError({ message, code: 404 });
    }
    const data = await findPostById(id);
    res.status(200).json({ data });
  } catch (e) {
    handleErrors(e, res);
  }
});

handler.post(async (req, res) => {
  try {
    const { param: slug } = req.query;
    if (slug === 'add') {
      const { postId } = await addPost(req);
      res.status(201).json({ postId });
    }
  } catch (e) {
    handleErrors(e, res);
  }
});
export default handler;
function handleErrors(e, res) {
  let error = e;
  if (!(e instanceof PostError)) {
    error = new PostError({
      message: 'Bad request, verify your params and retry later',
      code: 400,
    });
    // eslint-disable-next-line no-console
    console.log('Error', e.stack);
  }
  res.status(error.statusCode).json(error.toResponse());
}
