import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Router from 'next/router';
import { memo, useRef, useState } from 'react';

import HomeLayout from '../components/home/home-layout';
import Post from '../components/post/post-layout';
import PostPrompt from '../components/post/post-prompt';
import FuturaSpinner from '../components/spinners/futura';
import { useCurrentUserPosts, useUser } from '../lib/hooks';

export default function App() {
  const [user, { loading }] = useUser();
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const posts = useRef([]);

  if (loading) return <FuturaSpinner />;
  if (!loading && !user) {
    Router.push('/login');
    return <FuturaSpinner />;
  }
  dayjs.extend(relativeTime);

  const layoutProps = { modalOppened: showNewPostModal };
  const FeedMemo = memo(Feeds, () => true);
  return (
    <HomeLayout user={user} {...layoutProps}>
      <h1>Feeds</h1>
      <PostPrompt
        showModal={showNewPostModal}
        setShowModal={setShowNewPostModal}
      />
      <FeedMemo feeds={posts} />
    </HomeLayout>
  );
}

function Feeds() {
  const [userData, { loading }] = useCurrentUserPosts();
  if (loading) return <FuturaSpinner />;
  if (!loading && !userData) return null;
  const { posts = [] } = userData;
  return posts.map((post, index) => {
    post.metadata.date = dayjs().to(new Date(post?.metadata?.dateAdded));
    return <Post key={`${post.body.title}-${index}`} post={post} />;
  });
}
