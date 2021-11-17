import { useState } from 'react';

import { useUser } from '../../lib/hooks';
import style from '../../sass/app.module.scss';
import HeadMeta from '../head';
import FuturaSpinner from '../spinners/futura';
import LeftPane from './home-left-pane';
import { NavBar } from './home-navbar';
import RightPane from './home-right-pane';

export default function HomeLayout({ children, preventScroll }) {
  const [user, { loading }] = useUser();
  const [showLeftPane, setShowLeftPane] = useState(false);
  if (loading) return <FuturaSpinner />;
  const pageData = {
    title: 'Home | Social share',
    description: 'Social share',
    keywords: 'Social share, social network, urls',
    path: ['/home', '/'],
  };
  return (
    <>
      <HeadMeta pageData={pageData} />
      <div className={`root ${style.root}`}>
        <div className={style.root_content}>
          <LeftPane showLeftPane={showLeftPane} />
          <div className={style.main_content}>
            <NavBar setShowLeftPane={setShowLeftPane} user={user} />
            <main
              className={`${style.content_container} ${
                preventScroll && style.prevent_scroll
              }`}
            >
              {children}
            </main>
          </div>
          <RightPane />
        </div>
      </div>
    </>
  );
}
