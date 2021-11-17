import { useState } from 'react';

import { useUser } from '../../lib/hooks';
import style from '../../sass/app.module.scss';
import BurgerMenu from '../burgers/burger-menu';
import FormRowField from '../forms/form-rowField';
import DotsLoader from '../spinners/dot';
import UserAvatar from '../user/user-avatar';
import UserProfileCard from '../user/user-profile-card';

export function NavBar({ setShowLeftPane }) {
  return (
    <div className={style.main_page__navbar}>
      <BurgerMenu setShowLeftPane={setShowLeftPane} />
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
          <UserCard />
        </li>
      </ul>
    </div>
  );
}

export function UserCard() {
  const [user, { loading }] = useUser();
  const [showCard, setShowCard] = useState(false);
  if (loading) return <DotsLoader alone={false} />;
  const toggleProfileCard = () => setShowCard(!showCard);
  return (
    <div
      className={`${style.top_navbar__btn} ${style.profile_btn}`}
      onClick={toggleProfileCard}
    >
      <UserAvatar user={user} size='large' removeLink />
      {showCard && <UserProfileCard />}
    </div>
  );
}

export function NotificationButton() {
  return (
    <button className={`${style.top_navbar__btn} ${style.notif_btn}`}>
      <i className='fas fa-bell fa-1x' />
    </button>
  );
}
