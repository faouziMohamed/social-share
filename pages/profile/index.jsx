import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Router from 'next/router';
import { memo, useEffect, useRef, useState } from 'react';

import AppLayout from '../../components/app/AppLayout';
import NewPostModal from '../../components/app/post/new-post-modal';
import NewPostPrompt from '../../components/app/post/new-post-prompt';
import Post from '../../components/app/post/post';
import FuturaSpinner from '../../components/spinners/futura';
import { useUser } from '../../lib/hooks';
import { generateDate, randomName, readUserPosts } from '../../lib/utils/utils';

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
  // user.date = dayjs().to(Date.now());
  posts.current = readUserPosts({ user, size: 50 }) || [];
  dayjs.extend(relativeTime);

  const layoutProps = { modalOppened: showNewPostModal };
  const promptProps = { user, setShowNewPostModal };
  const modalProps = { user, setShowNewPostModal, setUpdateFeed };
  const FeedMemo = memo(Feeds, () => true);
  return (
    <AppLayout user={user} {...layoutProps}>
      <h1>Feeds</h1>
      {showNewPostModal && <NewPostModal {...modalProps} />}
      <NewPostPrompt {...promptProps} />
      <FeedMemo posts={posts} />
    </AppLayout>
  );
}

function Feeds({ posts }) {
  return posts.current.map((post, index) => {
    const num = Math.floor(Math.random() * 5);
    const u = {
      username: 'faouzi',
      firstname: randomName(),
      lastname: randomName(),
      date: dayjs().to(generateDate()),
      avatar: `/images/users/u-${num}.png`,
    };
    return <Post key={`${post.body.title}-${index}`} user={u} post={post} />;
  });
}
