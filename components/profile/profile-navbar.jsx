import { useState } from 'react';

import { useUser } from '../../lib/hooks';
import style from '../../sass/app.module.scss';
import FormRowField from '../forms/form-rowField';
import AppLogo from '../misc/app-logo';
import UserAvatar from '../user/user-avatar';
import UserProfileCard from '../user/user-profile-card';

export function ProfileNavBar() {
  const [user] = useUser();
  return (
    <div className={style.main_page__navbar}>
      <AppLogo size='medium' />
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

export function UserCard() {
  const [user] = useUser();
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
    <button className={style.btn_transRounded}>
      <i className='fas fa-bell fa-1x' />
    </button>
  );
}
