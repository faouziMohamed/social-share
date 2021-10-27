import {
  createPost,
  existsPostByUrl,
  findPostByUrl,
} from '../../lib/db/queries/post.queries';
import PostError from '../../lib/errors/post-error';
import {
  removeExtraSpaces,
  removeTrailingSlash,
} from '../../lib/utils/lib.utils';

export function readRequestBodyPOST(req) {
  const { author, ...post } = req.body;
  if (String(req?.user._id) !== String(author)) {
    const message = 'You are not authorized to add this post';
    throw new PostError({ message, code: 401 });
  }

  const { title: ttle, text: txt, url: link, urlAltText: linkTxt } = post;
  const [title, text, url, urlAltText] = [ttle, txt, link, linkTxt]
    .map(removeExtraSpaces)
    .map((str) => str.trim());

  if (!title) {
    throw new PostError({ message: 'Title is required', code: 400 });
  }

  if (!url) {
    throw new PostError({ message: 'URL is required', code: 400 });
  }
  return { title, text, url: removeTrailingSlash(url), urlAltText, author };
}

export async function addPost(req) {
  const { title, text, url, urlAltText, author } = readRequestBodyPOST(req);
  if (await existsPostByUrl(url)) {
    const post = await findPostByUrl(url);
    const message = `Post with URL ${url} already exists`;
    throw new PostError({ message, code: 409, hint: `/post/${post._id}` });
  }

  const { post } = await createPost({ title, text, url, urlAltText, author });
  return { postId: post._id };
}
