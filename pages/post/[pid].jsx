import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Router from 'next/router';

import AppLayout from '../../components/app/AppLayout';
import Post from '../../components/app/post/post';
import FuturaSpinner from '../../components/spinners/futura';
import { useFetch, useUser } from '../../lib/hooks';

export default function App() {
  const [user, { loading }] = useUser();

  if (loading) return <FuturaSpinner />;
  if (!loading && !user) {
    Router.push('/login');
    return <FuturaSpinner />;
  }
  user.avatar = '/images/users/u-0.svg';
  dayjs.extend(relativeTime);
  return (
    <AppLayout user={user}>
      <Feeds />
    </AppLayout>
  );
}

function Feeds() {
  const { pid: id } = Router.query;
  const url = `/api/posts/${id}`;
  const [data, { loading }] = useFetch(url);
  if (loading || (!loading && !data)) return <FuturaSpinner />;
  const { post, error } = data;
  if (error) {
    Router.route('/404');
    return <FuturaSpinner />;
  }
  post.metadata.date = dayjs().to(new Date(post?.metadata?.dateAdded));
  return <Post post={post} />;
}
