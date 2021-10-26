import { useState } from 'react';

import { useUser } from '../../lib/hooks';
import style from '../../sass/app.module.scss';
import HeadMeta from '../head';
import FuturaSpinner from '../spinners/futura';
import LeftPane from './home-left-pane';
import { NavBar } from './home-navbar';
import RightPane from './home-right-pane';

export default function HomeLayout({ children, modalOppened }) {
  const [user, { loading }] = useUser();
  const [showLeftPane, setShowLeftPane] = useState(false);
  if (loading) return <FuturaSpinner />;
  const sidenavPros = {
    showLeftPane,
    setShowLeftPane,
  };
  const burgerMenuPros = { setShowLeftPane };
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
          <LeftPane {...sidenavPros} />
          <div className={style.main_content}>
            <NavBar {...{ burgerMenuPros, user }} />
            <main
              className={`${style.content_container} ${
                modalOppened && style.prevent_scroll
              }`}
            >
              {children}
            </main>
          </div>

          <RightPane user={user} />
        </div>
      </div>
    </>
  );
}
