import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

import tabsData from '../../data/left-pane.json';
import { useUser } from '../../lib/hooks';
import style from '../../sass/app.module.scss';
import FuturaSpinner from '../spinners/futura';

export default function LeftPane({ currentTab = 'Home' }) {
  const [user, { loading, mutate }] = useUser();
  if (loading) return <FuturaSpinner />;
  setCurrentTab(currentTab);
  return (
    <div className={style.left_pane}>
      <div className={style.left_pane__content}>
        <header className={style.left_pane__header}>
          <div className={style.logo_container}>
            <Link href='/home'>
              <a className={`${style.user_profil} ${style.left_pane__link}`}>
                <Image
                  src='/images/users/u-01.svg'
                  alt={`${user.username} profil Picture`}
                  layout='fill'
                  className={style.user_profil__img}
                />
              </a>
            </Link>
          </div>
        </header>
        <div className={style.name_container}>
          <Link href='/app/profil'>
            <a className={`${style.user_profil_link} ${style.left_pane__link}`}>
              {`${user?.firstname} ${user?.lastname}`}
            </a>
          </Link>
        </div>
        <nav className={style.left_pane__nav}>
          <ul className={style.left_pane__nav__list}>
            <NavigationLinks tabs={tabsData} />
            <LogoutButton mutate={mutate} />
          </ul>
        </nav>
      </div>
    </div>
  );
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

function NavigationLinks({ tabs = [] }) {
  return tabs.map((data = {}) => <NewLink {...data} key={data.name} />);
}

function NewLink({ name, path, icon, current }) {
  let linkCls = `${style.left_pane__nav__link} `;
  linkCls += `${style.left_pane__link} `;
  linkCls += current ? style.current_page_tab : '';
  const key = `${name}-${path}`;
  return (
    <li className={style.left_pane__nav__item} key={key}>
      <Link href={`${path}`}>
        <a className={linkCls}>
          <span className={style.left_pane__nav__link__icon}>
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
        <span className={style.left_pane__nav__link__icon}>
          <i className='fad fa-sign-out-alt' />
        </span>
        <span className={style.left_pane__nav__link__text}>Logout</span>
      </button>
    </li>
  );
}

async function disconnectUser(mutate) {
  await fetch('/api/logout');
  mutate({ user: null });
  Router.push('/');
}
