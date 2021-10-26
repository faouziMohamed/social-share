import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Router from 'next/router';
import { memo, useEffect, useRef, useState } from 'react';

import HomeLayout from '../components/home/home-layout';
import NewPostModal from '../components/post/new-post-modal';
import NewPostPrompt from '../components/post/new-post-prompt';
import Post from '../components/post/post-layout';
import FuturaSpinner from '../components/spinners/futura';
import { useCurrentUserPosts, useUser } from '../lib/hooks';

export default function App() {
  const [user, { loading }] = useUser();
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [updateFeed, setUpdateFeed] = useState(true);
  const posts = useRef([]);
  useEffect(() => {
    const postJSON = JSON.stringify(posts.current);
    sessionStorage.setItem('posts', postJSON);
  }, []);

  useEffect(() => {
    if (updateFeed) {
      posts.current = JSON.parse(sessionStorage.getItem('posts')) || [];
      setUpdateFeed(false);
    }
  }, [updateFeed]);

  if (loading) return <FuturaSpinner />;
  if (!loading && !user) {
    Router.push('/login');
    return <FuturaSpinner />;
  }
  user.avatar = '/images/users/u-0.svg';
  dayjs.extend(relativeTime);

  const layoutProps = { modalOppened: showNewPostModal };
  const promptProps = { user, setShowNewPostModal };
  const modalProps = { user, setShowNewPostModal, setUpdateFeed };
  const FeedMemo = memo(Feeds, () => true);
  return (
    <HomeLayout user={user} {...layoutProps}>
      <h1>Feeds</h1>
      {showNewPostModal && <NewPostModal {...modalProps} />}
      <NewPostPrompt {...promptProps} />
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
