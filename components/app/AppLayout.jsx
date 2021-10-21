import { useState } from 'react';

import { useUser } from '../../lib/hooks';
import style from '../../sass/app.module.scss';
import FuturaSpinner from '../spinners/futura';
import LeftPane from './LeftPane';
import { NavBar } from './NavBar';
import RightPane from './RightPane';

export default function AppLayout({ children, modalOppened }) {
  const [user, { loading }] = useUser();
  const [showLeftPane, setShowLeftPane] = useState(false);
  if (loading) return <FuturaSpinner />;
  const sidenavPros = {
    showLeftPane,
    setShowLeftPane,
  };
  const burgerMenuPros = { setShowLeftPane };

  return (
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
  );
}
