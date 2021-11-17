import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Router from 'next/router';
import { memo, useState } from 'react';

import HomeLayout from '../components/home/home-layout';
import Feeds from '../components/post/feeds';
import PostPrompt from '../components/post/post-prompt';
import FuturaSpinner from '../components/spinners/futura';
import { useUser } from '../lib/hooks';

export default function App() {
  const [user, { loading }] = useUser();
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  if (loading) return <FuturaSpinner />;
  if (!loading && !user) {
    Router.push('/login');
    return <FuturaSpinner />;
  }
  dayjs.extend(relativeTime);
  const FeedMemo = memo(Feeds, () => true);
  return (
    <HomeLayout preventScroll={showNewPostModal}>
      <h1>Feeds</h1>
      <PostPrompt
        showModal={showNewPostModal}
        setShowModal={setShowNewPostModal}
      />
      <FeedMemo />
    </HomeLayout>
  );
}
