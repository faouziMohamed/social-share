import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useUser } from '../../lib/hooks';
import style from '../../sass/app.module.scss';
import css from '../../sass/profile.module.scss';
import FormRowField from '../forms/form-rowField';
import UserAvatar from '../user/user-avatar';
import UserProfileCard from '../user/user-profile-card';

export function ProfileNavBar() {
  const [user] = useUser();
  return (
    <div className={style.main_page__navbar}>
      <AppLogo user={user} size='medium' />
      <div className={style.search_prompt}>
        <FormRowField
          type='text'
          name='feed'
          labelIcon=''
          rowIcon='fas fa-search'
          labelText={`Search user`}
          model='search'
          flexible
        />
      </div>
      <ul className={style.top_navbar}>
        <li className={style.top_navbar__item}>
          <NotificationButton />
        </li>
        <li className={style.top_navbar__item}>
          <UserCard user={user} />
        </li>
      </ul>
    </div>
  );
}

function AppLogo({ user }) {
  return (
    <Link href='/home'>
      <a className={`${css.app_home_link}`}>
        <Image
          src='/sc-icons/logo/sc-default.png'
          alt={`${user.username} profile picture`}
          layout='fill'
        />
      </a>
    </Link>
  );
}

export function UserCard({ user }) {
  const [showCard, setShowCard] = useState(false);
  const toggleProfileCard = () => setShowCard(!showCard);
  return (
    <div
      className={`${style.top_navbar__btn} ${style.profile_btn}`}
      onClick={toggleProfileCard}
    >
      <UserAvatar user={user} size='large' removeLink />
      {showCard && <UserProfileCard user={user} />}
    </div>
  );
}

export function NotificationButton() {
  return (
    <button className={`${style.top_navbar__btn} ${style.notif_btn}`}>
      <i className='fas fa-bell fa-1x'> </i>
    </button>
  );
}
