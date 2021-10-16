import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Router from 'next/router';

import AppLayout from '../../components/app/AppLayout';
import Post from '../../components/app/post/Post';
import FuturaSpinner from '../../components/spinners/futura';
import { useUser } from '../../lib/hooks';
import { generateDate, randomName, readUserPosts } from '../../lib/utils/utils';

export default function App() {
  const [user, { loading }] = useUser();

  if (loading) return <FuturaSpinner />;

  if (!loading && !user) {
    Router.push('/login');
    return <FuturaSpinner />;
  }

  const posts = readUserPosts({ user, size: 250 });
  dayjs.extend(relativeTime);
  return (
    <AppLayout user={user}>
      <h1>Feeds</h1>
      {posts.map((post, index) => {
        const num = Math.floor(Math.random() * 5);
        const u = {
          username: 'faouzi',
          firstname: randomName(),
          lastname: randomName(),
          date: dayjs().to(generateDate()),
          avatar: `/images/users/u-${num}.png`,
        };
        return (
          <Post key={`${post.body.title}-${index}`} user={u} post={post} />
        );
      })}
    </AppLayout>
  );
}
