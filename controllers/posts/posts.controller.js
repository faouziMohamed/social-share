import {
  createPost,
  existsPostByUrl,
  findPostByUrl,
} from '../../lib/db/queries/post.queries';
import PostError from '../../lib/errors/post-error';
import { removeExtraSpaces, removeTrailingSlash } from '../../lib/utils';

export function readRequestBodyPOST(req) {
  const { title: t, body: b = '', url: u, author } = req.body;
  if (String(req?.user._id) !== String(author)) {
    const message = 'You are not authorized to add this post';
    throw new PostError({ message, code: 401 });
  }

  const [title, body, url] = [t, b, removeTrailingSlash(u)]
    .map(removeExtraSpaces)
    .map((str) => str.trim());

  if (!title) {
    throw new PostError({ message: 'Title is required', code: 400 });
  }

  if (!url) {
    throw new PostError({ message: 'URL is required', code: 400 });
  }
  return { title, body, url, author };
}

export async function addPost(req) {
  const { title, body, url, author } = readRequestBodyPOST(req);
  if (await existsPostByUrl(url)) {
    const post = await findPostByUrl(url);
    const message = `Post with URL ${url} already exists`;
    throw new PostError({ message, code: 409, hint: `/post/${post._id}` });
  }

  const { post } = await createPost({ title, body, url, author });
  return { postId: post._id };
}
