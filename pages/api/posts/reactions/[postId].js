import nextConnect from 'next-connect';

import {
  existsPostById,
  updatePostLikesById,
  // findPostById,
} from '../../../../lib/db/queries/post.queries';
import PostError from '../../../../lib/errors/post-error';
import auth from '../../../../middleware';

const handler = nextConnect().use(auth);

handler.put(async (req, res) => {
  try {
    if (!req?.user._id) {
      const message = 'You must be logged in to perform this action';
      throw new PostError({ message, code: 401 });
    }

    await checkRequestPreconditions(req.query);

    const { postId: pid, targeted } = req.query;
    if (targeted === 'likes') {
      const { like, dislike } = req.body;
      const args = { uid: req.user._id, like, dislike };
      await updatePostLikesById(pid, args);
      res.status(200).json({ status: 'success' });
      return;
    }

    res.status(201).json({ ...req.body, ...req.query });
  } catch (e) {
    handleErrors(e, res);
  }
});

export default handler;
async function checkRequestPreconditions(query) {
  const { targeted, postId } = query;
  if (!postId) {
    const message = 'A post ID is required, but nothing was provided';
    throw new PostError({ message, code: 400 });
  }
  const expectedTarget = ['likes', 'comment', 'share'];
  if (!targeted) {
    const message =
      'A targeted value is required, but nothing was provided.' +
      ` Expected value must be one of these: ${expectedTarget.join(', ')}`;
    const hint =
      'Set targeted to one of these: likes, comment, share. Eg: ?targeted=likes';
    throw new PostError({ message, code: 400, hint });
  } else if (!expectedTarget.includes(targeted)) {
    const message =
      `The targeted value must be one of these:` +
      ` ${expectedTarget.join(', ')}`;
    const hint = `Set targeted to one of these: ${expectedTarget.join(', ')}`;
    throw new PostError({ message, code: 400, hint });
  }

  if (!(await existsPostById(postId))) {
    const message = `Post with ID ${postId} does not exist`;
    throw new PostError({ message, code: 404, hint: 'Check the post ID' });
  }
}

function handleErrors(e, res) {
  let error = e;
  if (!(e instanceof PostError)) {
    error = new PostError({
      message: 'Bad request, verify your params and retry later',
      code: 400,
      hint: 'Check the request params',
    });
    // eslint-disable-next-line no-console
    console.log('Error', e.stack);
  }
  res.status(error.statusCode).json(error.toResponse());
}
