import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import tabsData from '../../data/left-pane.json';
import { useUser } from '../../lib/hooks';
import { disconnectUser } from '../../lib/utils/lib.utils';
import style from '../../sass/app.module.scss';
import FuturaSpinner from '../spinners/futura';
import UserAvatar from '../user/user-avatar';
import UserBadge from '../user/user-badge';

export default function LeftPane({ currentTab = 'Home', showLeftPane }) {
  const [user, { loading, mutate }] = useUser();
  const paneRef = useLeftPane(showLeftPane);
  if (loading) return <FuturaSpinner />;
  setCurrentTab(currentTab);

  return (
    <div className={style.left_pane} ref={paneRef}>
      <div className={style.left_pane__content}>
        <header className={style.left_pane__header}>
          <div className={style.logo_container}>
            <Link href='/home'>
              <a className={`${style.app_home_link} ${style.left_pane__link}`}>
                <Image
                  src='/favicon.ico'
                  alt={`${user.username} profil Picture`}
                  layout='fill'
                  className={style.app_home_link__img}
                />
              </a>
            </Link>
          </div>
        </header>
        <div className={style.name_container}>
          <Link href='/app/profile'>
            <a className={`${style.user_profile} ${style.left_pane__link}`}>
              <UserAvatar user={user} removeLink />
              <UserBadge user={user} removeLink darkerFont>
                <small className={style.lighter}>{`@${user?.username}`}</small>
              </UserBadge>
            </a>
          </Link>
        </div>
        <nav className={style.left_pane__nav}>
          <ul className={style.left_pane__nav__list}>
            <NavigationLinks tabs={tabsData} showTitle={showLeftPane} />
            <LogoutButton mutate={mutate} showTitle={showLeftPane} />
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
      paneRef.current.classList.add(style.left_pane_oppened);
    } else {
      paneRef.current.classList.remove(style.left_pane_oppened);
    }
  }, [showLeftPane]);
  return paneRef;
}

function setCurrentTab(currentTab) {
  tabsData.some((tab) => {
    if (tab.name === currentTab) {
      tab.current = true;
      return true;
    }
    return false;
  });
}

function NavigationLinks({ tabs = [], showTitle }) {
  return tabs.map((data = {}) => (
    <NewLink {...data} showTitle={showTitle} key={data.name} />
  ));
}

function NewLink({ name, path, icon, current, showTitle }) {
  let linkCls = `${style.left_pane__nav__link} `;
  linkCls += `${style.left_pane__link} `;
  linkCls += current ? style.current_page_tab : '';
  const iconRef = useRef(null);
  useEffect(() => {
    iconRef.current.setAttribute('title', '');
    if (showTitle) {
      const { title } = iconRef.current.dataset;
      iconRef.current.setAttribute('title', title);
    }
  }, [showTitle]);
  const key = `${name}-${path}`;

  return (
    <li className={style.left_pane__nav__item} key={key}>
      <Link href={`${path}`}>
        <a className={linkCls}>
          <span
            className={style.left_pane__nav__link__icon}
            ref={iconRef}
            data-title={name}
          >
            <i className={icon} />
          </span>
          <span className={style.left_pane__nav__link__text}>{name}</span>
        </a>
      </Link>
    </li>
  );
}

function LogoutButton({ mutate }) {
  let btnCls = `${style.left_pane__nav__link} `;
  btnCls += `${style.left_pane_logoutBtn} `;
  return (
    <li className={style.left_pane__nav__item}>
      <button className={btnCls} onClick={() => disconnectUser(mutate)}>
        <span className={style.left_pane__nav__link__icon} title={'Logout'}>
          <i className='fad fa-sign-out-alt' />
        </span>
        <span className={style.left_pane__nav__link__text}>Logout</span>
      </button>
    </li>
  );
}
