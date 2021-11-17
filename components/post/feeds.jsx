import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useCurrentUserPosts } from '../../lib/hooks';
import FuturaSpinner from '../spinners/futura';
import Post from './post-layout';

export default function Feeds({ postWide = false }) {
  dayjs.extend(relativeTime);
  const [userData, { loading }] = useCurrentUserPosts();
  if (loading) return <FuturaSpinner />;
  if (!loading && !userData) return null;
  const { posts = [] } = userData;
  return posts.map((post) => {
    post.metadata.date = dayjs().to(new Date(post.metadata?.dateAdded));
    const postId = post.metadata?.postId;
    return <Post key={`${postId}`} post={post} wide={postWide} />;
  });
}
