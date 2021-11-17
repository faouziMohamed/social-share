import Link from 'next/link';
import { useEffect, useRef } from 'react';

import tabsData from '../../data/left-pane.json';
import { useUser } from '../../lib/hooks';
import { disconnectUser } from '../../lib/utils/lib.utils';
import style from '../../sass/app.module.scss';
import AppLogo from '../misc/app-logo';
import FuturaSpinner from '../spinners/futura';
import UserAvatar from '../user/user-avatar';
import UserBadge from '../user/user-badge';

export default function LeftPane({ currentTab = 'Home', showLeftPane }) {
  const [user, { loading, mutate }] = useUser();
  const paneRef = useLeftPane(showLeftPane);
  if (loading) return <FuturaSpinner />;
  const tabs = tabsData.map((t) => ({
    ...t,
    current: currentTab === t.name,
    showTitle: showLeftPane,
  }));
  const Badge = () => (
    <UserBadge user={user} removeLink darkerFont>
      <small className={style.lighter}>{`@${user?.username}`}</small>
    </UserBadge>
  );
  const showBadge = !showLeftPane;
  const media700px = matchMedia('(min-width:700px)');
  return (
    <div className={style.leftpane} ref={paneRef}>
      <div className={style.leftpane__content}>
        <header className={style.leftpane__header}>
          <div className={style.logo_container}>
            <AppLogo size='large' />
          </div>
        </header>
        <div className={style.name_container}>
          <Link href='/profile'>
            <a className={`${style.user_profile} ${style.leftpane_link}`}>
              <UserAvatar user={user} removeLink />
              {media700px.matches ? showBadge && <Badge /> : <Badge />}
            </a>
          </Link>
        </div>
        <nav className={style.leftpane__nav}>
          <ul className={style.leftpane_tabs}>
            <NavigationLinks tabs={tabs} />
            <LogoutButton mutate={mutate} />
          </ul>
        </nav>
      </div>
    </div>
  );
}

function useLeftPane(showLeftPane) {
  const paneRef = useRef(null);
  useEffect(() => {
    if (showLeftPane) {
      paneRef.current.classList.add(style.leftpane_oppened);
    } else {
      paneRef.current.classList.remove(style.leftpane_oppened);
    }
  }, [showLeftPane]);
  return paneRef;
}

function NavigationLinks({ tabs = [] }) {
  return tabs.map((data = {}) => (
    <NewLink
      name={data.name}
      path={data.path}
      icon={data.icon}
      current={data.current}
      showTitle={data.showTitle}
      key={data.name}
    />
  ));
}

function NewLink({ name, path, icon, current, showTitle }) {
  let linkClass = `${style.leftpane_navLink} `;
  linkClass += `${style.leftpane_link} `;
  linkClass += current ? style.current_page_tab : '';
  const iconRef = useRef(null);
  useEffect(() => {
    iconRef.current.setAttribute('title', '');
    if (showTitle) {
      const { title } = iconRef.current.dataset;
      iconRef.current.setAttribute('title', title);
    }
  }, [showTitle]);
  return (
    <li className={style.leftpane_item}>
      <Link href={`${path}`}>
        <a className={linkClass}>
          <span ref={iconRef} data-title={name}>
            <i className={icon} />
          </span>
          <span className={style.leftpane_linkText}>{name}</span>
        </a>
      </Link>
    </li>
  );
}

function LogoutButton({ mutate }) {
  let btnCls = `${style.leftpane_navLink} ${style.leftpane_link} `;
  btnCls += `${style.leftpane_logoutBtn} `;
  return (
    <li className={style.leftpane_item}>
      <button className={btnCls} onClick={() => disconnectUser(mutate)}>
        <span title={'Logout'}>
          <i className='fad fa-sign-out-alt' />
        </span>
        <span className={style.leftpane_linkText}>Logout</span>
      </button>
    </li>
  );
}
